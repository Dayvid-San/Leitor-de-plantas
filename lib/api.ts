const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const TOKEN_KEY = "visitcard_admin_token";

export type ProjectCategory = "programmer" | "research";

export interface ApiProject {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  role: string;
  github?: string;
  demo?: string;
  paper?: string;
  dataset?: string;
}

export interface ProjectInput {
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  role: string;
  github?: string;
  demo?: string;
  paper?: string;
  dataset?: string;
}

export interface ApiStatusItem {
  id: string;
  icon?: string;
  label: string;
  value: string;
  position: number;
}

export interface StatusItemInput {
  icon?: string;
  label: string;
  value: string;
  position?: number;
}

export interface ContentEntryDto {
  id: string;
  key: string;
  valuePt: string;
  valueEn?: string;
}

export interface ContentEntryInput {
  key: string;
  valuePt: string;
  valueEn?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // response had no JSON body, keep the default message
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function login(email: string, password: string): Promise<void> {
  const data = await request<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
}

export function logout() {
  clearToken();
}

export function forgotPassword(email: string): Promise<void> {
  return request<void>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token: string, newPassword: string): Promise<void> {
  return request<void>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
}

export function listProjects(category: ProjectCategory): Promise<ApiProject[]> {
  return request<ApiProject[]>(`/api/projects/${category}`);
}

export function createProject(category: ProjectCategory, data: ProjectInput): Promise<ApiProject> {
  return request<ApiProject>(`/api/projects/${category}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateProject(category: ProjectCategory, id: string, data: ProjectInput): Promise<ApiProject> {
  return request<ApiProject>(`/api/projects/${category}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteProject(category: ProjectCategory, id: string): Promise<void> {
  return request<void>(`/api/projects/${category}/${id}`, { method: "DELETE" });
}

export async function uploadImage(category: ProjectCategory, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const data = await request<{ url: string }>(`/api/upload/${category}`, {
    method: "POST",
    body: formData,
  });
  return data.url;
}

export function listStatusItems(): Promise<ApiStatusItem[]> {
  return request<ApiStatusItem[]>("/api/status");
}

export function createStatusItem(data: StatusItemInput): Promise<ApiStatusItem> {
  return request<ApiStatusItem>("/api/status", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateStatusItem(id: string, data: StatusItemInput): Promise<ApiStatusItem> {
  return request<ApiStatusItem>(`/api/status/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteStatusItem(id: string): Promise<void> {
  return request<void>(`/api/status/${id}`, { method: "DELETE" });
}

export function getPublicContent(locale: string): Promise<Record<string, string>> {
  return request<Record<string, string>>(`/api/content?locale=${encodeURIComponent(locale)}`);
}

export function listContentEntries(): Promise<ContentEntryDto[]> {
  return request<ContentEntryDto[]>("/api/content/admin");
}

export function upsertContentEntry(data: ContentEntryInput): Promise<ContentEntryDto> {
  return request<ContentEntryDto>("/api/content", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteContentEntry(key: string): Promise<void> {
  return request<void>(`/api/content/${encodeURIComponent(key)}`, { method: "DELETE" });
}

export function sendContact(data: ContactInput): Promise<void> {
  return request<void>("/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
