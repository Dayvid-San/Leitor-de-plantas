"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Github,
  Layers,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Quote,
  Mic,
  Radio,
  GitBranch,
} from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  tags: [
    "Python 3.12",
    "FastAPI",
    "SQLAlchemy + Alembic",
    "Pydantic v2",
    "React 19",
    "TanStack Router/Query",
    "TypeScript (strict)",
    "Tailwind CSS v4",
    "Whisper (voz local)",
    "Playwright",
  ],
  links: {
    backend: "https://github.com/dayvid-santana/Cortana",
    frontend: "https://github.com/dayvid-santana/Cortana-Front",
  },
  challengeKeys: ["hefesto.challenges.item1", "hefesto.challenges.item2", "hefesto.challenges.item3"],
  solutionKeys: ["hefesto.solutions.item1", "hefesto.solutions.item2", "hefesto.solutions.item3"],
}

const features = [
  { key: "sourced", icon: Quote },
  { key: "voice", icon: Mic },
  { key: "streaming", icon: Radio },
  { key: "isolated", icon: GitBranch },
]

export default function Hefesto() {
  const { t } = useContent();
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Botão Voltar */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="-ml-4 text-muted-foreground hover:text-primary">
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("projectDetail.back")}
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("hefesto.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("hefesto.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("hefesto.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Chat Hero (sem screenshot: mockup do diferencial real, a citação verificável) */}
      <div className="relative mb-12 w-full overflow-hidden rounded-xl border bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-zinc-500">Hefesto - chat</span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex justify-start">
            <div className="max-w-md rounded-2xl rounded-tl-sm bg-zinc-800 px-4 py-3 text-sm text-zinc-200">
              {t("hefesto.chatDemo.question")}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-lg space-y-2 rounded-2xl rounded-tr-sm border border-purple-900/40 bg-purple-950/40 px-4 py-3 text-sm text-zinc-100">
              <p>
                {t("hefesto.chatDemo.answer")}
              </p>
              <div className="flex w-fit items-center gap-1.5 rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-1 font-mono text-[11px] text-purple-300">
                <Quote className="h-3 w-3" />
                src/devmate/api/chat.py:118-142 · commit 4a7c9e1
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_300px] lg:gap-16">
        {/* Coluna Principal (Conteúdo) */}
        <div className="space-y-12">
          {/* Visão Geral */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              {t("hefesto.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("hefesto.overview.body")}</p>
          </section>

          <Separator />

          {/* O que a assistente faz */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("hefesto.features.heading")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.key} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{t(`hefesto.features.${feature.key}.title`)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`hefesto.features.${feature.key}.description`)}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          <Separator />

          {/* Desafios e Soluções */}
          <section className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-500/80">{t("hefesto.challenges.heading")}</h3>
              <ul className="space-y-3">
                {projectData.challengeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-500/80">{t("hefesto.solutions.heading")}</h3>
              <ul className="space-y-3">
                {projectData.solutionKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-500" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Separator />

          {/* Arquitetura Técnica */}
          <section className="space-y-6">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Cpu className="mr-2 h-6 w-6 text-primary" />
              {t("hefesto.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("hefesto.architecture.body")}
            </p>

            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-full space-y-4 text-left font-mono text-xs">
                  <div className="rounded border bg-background p-3">
                    <span className="font-bold text-blue-500">[Front web]</span> {t("hefesto.architecture.diagram.front")}
                  </div>
                  <div className="text-center text-muted-foreground">{t("hefesto.architecture.diagram.arrow")}</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-purple-500">[Backend de chat]</span> {t("hefesto.architecture.diagram.chat")}
                    </div>
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-green-500">[Orquestrador de agentes]</span> {t("hefesto.architecture.diagram.orchestrator")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              {t("hefesto.architecture.maestroNote")}{" "}
              <Link href="/portfolio/maestro" className="font-medium text-primary underline-offset-4 hover:underline">
                {t("hefesto.architecture.maestroLink")}
              </Link>
              .
            </p>
          </section>

          <Separator />

          {/* Segurança */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
              {t("hefesto.security.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("hefesto.security.intro")}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{t("hefesto.security.item1")}</li>
              <li>{t("hefesto.security.item2")}</li>
              <li>{t("hefesto.security.item3")}</li>
              <li>
                {t("hefesto.security.item4Prefix")} (<code>git reset --hard</code>, <code>git push --force</code>,{" "}
                <code>rm -rf</code> {t("hefesto.security.item4Suffix")}
              </li>
            </ul>
          </section>
        </div>

        {/* Coluna Lateral (Metadados) */}
        <aside className="space-y-8">
          {/* Links de Ação */}
          <div className="flex flex-col gap-3">
            {projectData.links.backend && (
              <Button size="lg" className="w-full font-semibold" asChild>
                <a href={projectData.links.backend} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("hefesto.links.backend")}
                </a>
              </Button>
            )}
            {projectData.links.frontend && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={projectData.links.frontend} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("hefesto.links.frontend")}
                </a>
              </Button>
            )}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("hefesto.labels.techStack")}</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Info Adicional */}
          <div className="space-y-4 rounded-lg border bg-muted/50 p-6">
            <h3 className="font-semibold">{t("projectDetail.techSheet")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("hefesto.labels.role")}</span>
                <span className="font-medium text-right">{t("hefesto.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.period")}</span>
                <span className="font-medium">{t("hefesto.date")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("hefesto.labels.services")}</span>
                <span className="font-medium text-primary">{t("hefesto.servicesValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("hefesto.labels.tests")}</span>
                <span className="font-medium">{t("hefesto.testsValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-green-600">{t("hefesto.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
