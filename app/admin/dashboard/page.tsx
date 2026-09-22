"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  isAuthenticated,
  logout,
  listProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadImage,
  listStatusItems,
  createStatusItem,
  updateStatusItem,
  deleteStatusItem,
  listContentEntries,
  upsertContentEntry,
  type ApiProject,
  type ProjectCategory,
  type ApiStatusItem,
  type ContentEntryDto,
} from "@/lib/api";
import { CONTENT_KEYS, CONTENT_PAGES, type ContentKeyDef } from "@/lib/content-registry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Link2, Upload, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";

interface FormData {
  title: string;
  description: string;
  image: string;
  tags: string;
  date: string;
  role: string;
  github: string;
  demo: string;
  paper: string;
  dataset: string;
}

const initialFormState: FormData = {
  title: "", description: "", image: "", tags: "",
  date: "", role: "", github: "", demo: "", paper: "", dataset: ""
};

const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  programmer: "Programmer Project",
  research: "Research Project",
};

interface ImageFieldState {
  imageMode: "url" | "upload";
  setImageMode: (mode: "url" | "upload") => void;
  imageFile: File | null;
  imageFilePreview: string | null;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AdminDashboard() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [projectCategory, setProjectCategory] = useState<ProjectCategory>("programmer");
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [statusMessage, setStatusMessage] = useState("");
  const router = useRouter();

  const [programmerProjects, setProgrammerProjects] = useState<ApiProject[]>([]);
  const [researchProjects, setResearchProjects] = useState<ApiProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [editingProject, setEditingProject] = useState<{ id: string; category: ProjectCategory } | null>(null);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFilePreview, setImageFilePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [statusItems, setStatusItems] = useState<ApiStatusItem[]>([]);
  const [loadingStatusItems, setLoadingStatusItems] = useState(true);
  const [statusFormData, setStatusFormData] = useState({ icon: "", label: "", value: "" });
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [statusItemMessage, setStatusItemMessage] = useState("");

  const [contentEntries, setContentEntries] = useState<Record<string, ContentEntryDto>>({});
  const [loadingContent, setLoadingContent] = useState(true);
  const [selectedContentPage, setSelectedContentPage] = useState<string>(CONTENT_PAGES[0] ?? "");
  const [contentDrafts, setContentDrafts] = useState<Record<string, { valuePt: string; valueEn: string }>>({});
  const [contentSavingKey, setContentSavingKey] = useState<string | null>(null);
  const [contentMessage, setContentMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
      return;
    }
    setCheckingAuth(false);
  }, [router]);

  const fetchProjects = async () => {
    setLoadingProjects(true);
    try {
      const [programmer, research] = await Promise.all([
        listProjects("programmer"),
        listProjects("research"),
      ]);
      setProgrammerProjects(programmer);
      setResearchProjects(research);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) fetchProjects();
  }, [checkingAuth]);

  const fetchStatusItems = async () => {
    setLoadingStatusItems(true);
    try {
      const items = await listStatusItems();
      setStatusItems(items);
    } catch (error) {
      console.error("Error fetching status items: ", error);
    } finally {
      setLoadingStatusItems(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) fetchStatusItems();
  }, [checkingAuth]);

  const fetchContentEntries = async () => {
    setLoadingContent(true);
    try {
      const entries = await listContentEntries();
      const map: Record<string, ContentEntryDto> = {};
      entries.forEach((entry) => {
        map[entry.key] = entry;
      });
      setContentEntries(map);
    } catch (error) {
      console.error("Error fetching content entries: ", error);
    } finally {
      setLoadingContent(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) fetchContentEntries();
  }, [checkingAuth]);

  useEffect(() => {
    return () => {
      if (imageFilePreview) URL.revokeObjectURL(imageFilePreview);
    };
  }, [imageFilePreview]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (imageFilePreview) URL.revokeObjectURL(imageFilePreview);
    setImageFilePreview(file ? URL.createObjectURL(file) : null);
  };

  const resetImageField = () => {
    setImageMode("url");
    setImageFile(null);
    if (imageFilePreview) URL.revokeObjectURL(imageFilePreview);
    setImageFilePreview(null);
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingProject(null);
    resetImageField();
  };

  const handleEdit = (project: ApiProject, category: ProjectCategory) => {
    setEditingProject({ id: project.id, category });
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.join(", "),
      date: project.date,
      role: project.role,
      github: project.github ?? "",
      demo: project.demo ?? "",
      paper: project.paper ?? "",
      dataset: project.dataset ?? "",
    });
    resetImageField();
    setStatusMessage("");
  };

  const handleDelete = async (project: ApiProject, category: ProjectCategory) => {
    if (!window.confirm(`Excluir "${project.title}"? Essa ação não pode ser desfeita.`)) return;
    try {
      await deleteProject(category, project.id);
      if (editingProject?.id === project.id) resetForm();
      await fetchProjects();
      setStatusMessage("Projeto excluído.");
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleStatusInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatusFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetStatusForm = () => {
    setStatusFormData({ icon: "", label: "", value: "" });
    setEditingStatusId(null);
  };

  const handleStatusEdit = (item: ApiStatusItem) => {
    setEditingStatusId(item.id);
    setStatusFormData({ icon: item.icon ?? "", label: item.label, value: item.value });
    setStatusItemMessage("");
  };

  const handleStatusDelete = async (item: ApiStatusItem) => {
    if (!window.confirm(`Excluir "${item.label}"? Essa ação não pode ser desfeita.`)) return;
    try {
      await deleteStatusItem(item.id);
      if (editingStatusId === item.id) resetStatusForm();
      await fetchStatusItems();
      setStatusItemMessage("Item excluído.");
      setTimeout(() => setStatusItemMessage(""), 3000);
    } catch (error: any) {
      setStatusItemMessage(`Error: ${error.message}`);
    }
  };

  const handleStatusMove = async (item: ApiStatusItem, direction: "up" | "down") => {
    const index = statusItems.findIndex((s) => s.id === item.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (index === -1 || swapIndex < 0 || swapIndex >= statusItems.length) return;
    const swapWith = statusItems[swapIndex];
    try {
      await Promise.all([
        updateStatusItem(item.id, { icon: item.icon, label: item.label, value: item.value, position: swapWith.position }),
        updateStatusItem(swapWith.id, { icon: swapWith.icon, label: swapWith.label, value: swapWith.value, position: item.position }),
      ]);
      await fetchStatusItems();
    } catch (error: any) {
      setStatusItemMessage(`Error: ${error.message}`);
    }
  };

  const handleStatusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusItemMessage("Saving...");
    try {
      const payload = {
        icon: statusFormData.icon || undefined,
        label: statusFormData.label,
        value: statusFormData.value,
      };
      if (editingStatusId) {
        await updateStatusItem(editingStatusId, payload);
        setStatusItemMessage("Item atualizado com sucesso!");
      } else {
        await createStatusItem(payload);
        setStatusItemMessage("Item adicionado com sucesso!");
      }
      resetStatusForm();
      await fetchStatusItems();
      setTimeout(() => setStatusItemMessage(""), 3000);
    } catch (error: any) {
      console.error("Error saving status item: ", error);
      setStatusItemMessage(`Error: ${error.message}`);
    }
  };

  const getContentDraft = (def: ContentKeyDef) => {
    return (
      contentDrafts[def.key] ?? {
        valuePt: contentEntries[def.key]?.valuePt ?? def.defaultPt,
        valueEn: contentEntries[def.key]?.valueEn ?? "",
      }
    );
  };

  const handleContentChange = (def: ContentKeyDef, field: "valuePt" | "valueEn", value: string) => {
    setContentDrafts((prev) => ({
      ...prev,
      [def.key]: { ...getContentDraft(def), [field]: value },
    }));
  };

  const saveContentEntry = async (def: ContentKeyDef) => {
    const draft = getContentDraft(def);
    setContentSavingKey(def.key);
    try {
      const saved = await upsertContentEntry({
        key: def.key,
        valuePt: draft.valuePt,
        valueEn: draft.valueEn || undefined,
      });
      setContentEntries((prev) => ({ ...prev, [def.key]: saved }));
      setContentMessage("Conteúdo salvo.");
      setTimeout(() => setContentMessage(""), 2000);
    } catch (error: any) {
      setContentMessage(`Error: ${error.message}`);
    } finally {
      setContentSavingKey(null);
    }
  };

  const submitProject = async (category: ProjectCategory) => {
    if (imageMode === "upload" && !imageFile && !formData.image) {
      setStatusMessage("Error: selecione uma imagem para enviar.");
      return;
    }

    setStatusMessage(imageMode === "upload" && imageFile ? "Enviando imagem..." : "Saving...");

    try {
      let imageUrl = formData.image;

      if (imageMode === "upload" && imageFile) {
        setIsUploadingImage(true);
        imageUrl = await uploadImage(category, imageFile);
        setIsUploadingImage(false);
      }

      setStatusMessage("Saving...");

      const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

      const payload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        tags: tagsArray,
        date: formData.date,
        role: formData.role,
        ...(category === "programmer"
          ? { github: formData.github || undefined, demo: formData.demo || undefined }
          : { paper: formData.paper || undefined, dataset: formData.dataset || undefined, github: formData.github || undefined }),
      };

      if (editingProject && editingProject.category === category) {
        await updateProject(category, editingProject.id, payload);
        setStatusMessage("Project updated successfully!");
      } else {
        await createProject(category, payload);
        setStatusMessage("Project added successfully!");
      }

      resetForm();
      await fetchProjects();
      setTimeout(() => setStatusMessage(""), 3000);

    } catch (error: any) {
      console.error("Error saving project: ", error);
      setIsUploadingImage(false);
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitProject(projectCategory);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) submitProject(editingProject.category);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  if (checkingAuth) return <div className="p-10 text-center">Loading...</div>;

  const isSaving = statusMessage === "Saving..." || statusMessage === "Enviando imagem...";
  const imageFieldState: ImageFieldState = {
    imageMode,
    setImageMode,
    imageFile,
    imageFilePreview,
    onImageFileChange: handleImageFileChange,
  };

  return (
    <div className="container px-4 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              type="button"
              variant={projectCategory === "programmer" ? "default" : "outline"}
              onClick={() => setProjectCategory("programmer")}
            >
              Programmer Project
            </Button>
            <Button
              type="button"
              variant={projectCategory === "research" ? "default" : "outline"}
              onClick={() => setProjectCategory("research")}
            >
              Research Project
            </Button>
          </div>

          <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectFormFields
              formData={formData}
              onInputChange={handleInputChange}
              projectCategory={projectCategory}
              imageField={imageFieldState}
            />

            <div className="col-span-1 md:col-span-2 flex items-center gap-4 mt-4">
              <Button type="submit" className="w-full md:w-auto" disabled={isSaving}>
                {isUploadingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Project
              </Button>
              {statusMessage && !editingProject && (
                <span className={`text-sm font-medium ${statusMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {statusMessage}
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Status na TYTO</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleStatusSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm">Ícone (emoji)</label>
              <input name="icon" value={statusFormData.icon} onChange={handleStatusInputChange} placeholder="👑" className="w-full p-2 border rounded bg-background" />
            </div>
            <div>
              <label className="text-sm">Rótulo *</label>
              <input required name="label" value={statusFormData.label} onChange={handleStatusInputChange} placeholder="Cargo" className="w-full p-2 border rounded bg-background" />
            </div>
            <div>
              <label className="text-sm">Valor *</label>
              <input required name="value" value={statusFormData.value} onChange={handleStatusInputChange} placeholder="Senhor da Guerra" className="w-full p-2 border rounded bg-background" />
            </div>
            <div className="flex items-end gap-2">
              <Button type="submit" className="w-full">
                {editingStatusId ? "Atualizar" : "Adicionar"}
              </Button>
              {editingStatusId && (
                <Button type="button" variant="outline" onClick={resetStatusForm}>
                  Cancelar
                </Button>
              )}
            </div>
            {statusItemMessage && (
              <div className="col-span-1 md:col-span-4">
                <span className={`text-sm font-medium ${statusItemMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {statusItemMessage}
                </span>
              </div>
            )}
          </form>

          <div className="mt-6 space-y-2">
            {loadingStatusItems ? (
              <p className="text-sm text-muted-foreground">Carregando...</p>
            ) : statusItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum item cadastrado.</p>
            ) : (
              statusItems.map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="min-w-0 flex-1 font-mono text-sm">
                    {item.icon ? `${item.icon} ` : ""}{item.label}: {item.value}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="icon" variant="outline" onClick={() => handleStatusMove(item, "up")} disabled={index === 0} aria-label="Mover para cima">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleStatusMove(item, "down")} disabled={index === statusItems.length - 1} aria-label="Mover para baixo">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => handleStatusEdit(item)} aria-label="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => handleStatusDelete(item)} aria-label="Excluir">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Conteúdo do Site (PT / EN)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium">Página:</label>
            <select
              value={selectedContentPage}
              onChange={(e) => setSelectedContentPage(e.target.value)}
              className="rounded-md border bg-background p-2 text-sm"
            >
              {CONTENT_PAGES.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
            {contentMessage && (
              <span className={`text-sm font-medium ${contentMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                {contentMessage}
              </span>
            )}
          </div>

          {loadingContent ? (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          ) : (
            <div className="space-y-6">
              {CONTENT_KEYS.filter((def) => def.page === selectedContentPage).map((def) => {
                const draft = getContentDraft(def);
                const isSaving = contentSavingKey === def.key;
                const Field = def.multiline ? "textarea" : "input";
                return (
                  <div key={def.key} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium">{def.label}</p>
                      <code className="text-xs text-muted-foreground">{def.key}</code>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Português</label>
                        <Field
                          value={draft.valuePt}
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            handleContentChange(def, "valuePt", e.target.value)
                          }
                          rows={def.multiline ? 4 : undefined}
                          className="w-full p-2 border rounded bg-background text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">English</label>
                        <Field
                          value={draft.valueEn}
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                            handleContentChange(def, "valueEn", e.target.value)
                          }
                          rows={def.multiline ? 4 : undefined}
                          placeholder={draft.valuePt}
                          className="w-full p-2 border rounded bg-background text-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button size="sm" onClick={() => saveContentEntry(def)} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}
                        Salvar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de projetos existentes */}
      <div className="mt-10 space-y-8">
        <ProjectList
          title="Programmer Projects"
          projects={programmerProjects}
          category="programmer"
          loading={loadingProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <ProjectList
          title="Research Projects"
          projects={researchProjects}
          category="research"
          loading={loadingProjects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal de edição */}
      <Dialog
        open={editingProject !== null}
        onOpenChange={(open) => {
          if (!open) resetForm();
        }}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Edit Project
              {editingProject && <Badge variant="secondary">{CATEGORY_LABEL[editingProject.category]}</Badge>}
            </DialogTitle>
            <DialogDescription>
              Altere os campos abaixo e clique em "Update Project" para salvar.
            </DialogDescription>
          </DialogHeader>

          {editingProject && (
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProjectFormFields
                formData={formData}
                onInputChange={handleInputChange}
                projectCategory={editingProject.category}
                imageField={imageFieldState}
              />

              {statusMessage && (
                <div className="col-span-1 md:col-span-2">
                  <span className={`text-sm font-medium ${statusMessage.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                    {statusMessage}
                  </span>
                </div>
              )}

              <DialogFooter className="col-span-1 md:col-span-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isUploadingImage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Project
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectFormFields({
  formData,
  onInputChange,
  projectCategory,
  imageField,
}: {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  projectCategory: ProjectCategory;
  imageField: ImageFieldState;
}) {
  const { imageMode, setImageMode, imageFile, imageFilePreview, onImageFileChange } = imageField;

  return (
    <>
      <div className="col-span-1 md:col-span-2">
        <label className="text-sm">Title *</label>
        <input required name="title" value={formData.title} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
      </div>

      <div className="col-span-1 md:col-span-2">
        <label className="text-sm">Description *</label>
        <textarea required name="description" value={formData.description} onChange={onInputChange} className="w-full p-2 border rounded bg-background" rows={3} />
      </div>

      {/* Imagem: link ou upload */}
      <div className="col-span-1 md:col-span-2 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm">Imagem *</label>
          <div className="flex gap-1 rounded-md border p-1">
            <Button
              type="button"
              size="sm"
              variant={imageMode === "url" ? "default" : "ghost"}
              onClick={() => setImageMode("url")}
            >
              <Link2 className="mr-1 h-3.5 w-3.5" />
              Link
            </Button>
            <Button
              type="button"
              size="sm"
              variant={imageMode === "upload" ? "default" : "ghost"}
              onClick={() => setImageMode("upload")}
            >
              <Upload className="mr-1 h-3.5 w-3.5" />
              Upload
            </Button>
          </div>
        </div>

        {imageMode === "url" ? (
          <input
            required={imageMode === "url"}
            name="image"
            value={formData.image}
            onChange={onInputChange}
            placeholder="https://... ou /image.png"
            className="w-full p-2 border rounded bg-background"
          />
        ) : (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={onImageFileChange}
              className="w-full p-2 border rounded bg-background text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground"
            />
            {(imageFilePreview || formData.image) && (
              <div className="relative h-32 w-full max-w-xs overflow-hidden rounded border bg-muted">
                <Image
                  src={imageFilePreview || formData.image}
                  alt="Pré-visualização"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="text-sm">Tags (comma separated) *</label>
        <input required name="tags" value={formData.tags} onChange={onInputChange} placeholder="React, Node, PostgreSQL" className="w-full p-2 border rounded bg-background" />
      </div>

      <div>
        <label className="text-sm">Date *</label>
        <input required name="date" value={formData.date} onChange={onInputChange} placeholder="2024-2026" className="w-full p-2 border rounded bg-background" />
      </div>

      <div>
        <label className="text-sm">Role *</label>
        <input required name="role" value={formData.role} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
      </div>

      <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t mt-2">
        {projectCategory === "programmer" ? (
          <>
            <div>
              <label className="text-sm">GitHub URL</label>
              <input name="github" value={formData.github} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
            </div>
            <div>
              <label className="text-sm">Demo URL</label>
              <input name="demo" value={formData.demo} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm">Paper URL</label>
              <input name="paper" value={formData.paper} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
            </div>
            <div>
              <label className="text-sm">Dataset URL</label>
              <input name="dataset" value={formData.dataset} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="text-sm">GitHub URL</label>
              <input name="github" value={formData.github} onChange={onInputChange} className="w-full p-2 border rounded bg-background" />
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ProjectList({
  title,
  projects,
  category,
  loading,
  onEdit,
  onDelete,
}: {
  title: string;
  projects: ApiProject[];
  category: ProjectCategory;
  loading: boolean;
  onEdit: (project: ApiProject, category: ProjectCategory) => void;
  onDelete: (project: ApiProject, category: ProjectCategory) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum projeto cadastrado.</p>
      ) : (
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-muted">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{project.title}</p>
                <p className="truncate text-sm text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="icon" variant="outline" onClick={() => onEdit(project, category)} aria-label="Editar">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => onDelete(project, category)} aria-label="Excluir">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
