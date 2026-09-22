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
  Workflow,
  Bot,
  GitBranch,
  Terminal,
} from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  tags: [
    "Python 3.11",
    "FastAPI",
    "Typer",
    "Pydantic",
    "PyYAML",
    "Git Worktrees",
    "Codex CLI",
    "pytest",
    "Docker",
  ],
  links: {
    github: "https://github.com/Dayvid-San/Maetro-Agent",
  },
  challengeKeys: ["maestro.challenges.item1", "maestro.challenges.item2", "maestro.challenges.item3"],
  solutionKeys: ["maestro.solutions.item1", "maestro.solutions.item2", "maestro.solutions.item3"],
}

const features = [
  { key: "pipeline", icon: Workflow },
  { key: "agents", icon: Bot },
  { key: "worktrees", icon: GitBranch },
  { key: "cli", icon: Terminal },
]

export default function Maestro() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("maestro.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("maestro.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("maestro.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Terminal Hero (sem screenshot: é uma ferramenta de linha de comando) */}
      <div className="relative mb-12 w-full overflow-hidden rounded-xl border bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-zinc-500">maestro</span>
        </div>
        <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
          <code className="font-mono text-zinc-300">
            <span className="text-zinc-500">$ </span>
            <span className="text-green-400">maestro</span> task &quot;Adicionar validação de CPF&quot;{"\n"}
            <span className="text-zinc-500">{"> "}plano criado, repositório limpo, aguardando confirmação</span>
            {"\n\n"}
            <span className="text-zinc-500">$ </span>
            <span className="text-green-400">maestro</span> run &lt;id-do-plano&gt; --confirm{"\n"}
            <span className="text-zinc-500">{"> "}branch maestro/&lt;id&gt; criada em worktree isolado</span>
            {"\n"}
            <span className="text-zinc-500">{"> "}pipeline: contexto → requisitos → implementação → testes → revisão</span>
            {"\n\n"}
            <span className="text-zinc-500">$ </span>
            <span className="text-green-400">maestro</span> job &lt;id-do-plano&gt;{"\n"}
            <span className="text-zinc-500">{"> "}status: concluído</span>
          </code>
        </pre>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_300px] lg:gap-16">
        {/* Coluna Principal (Conteúdo) */}
        <div className="space-y-12">
          {/* Visão Geral */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              {t("maestro.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("maestro.overview.body")}</p>
          </section>

          <Separator />

          {/* O que a ferramenta faz */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("maestro.features.heading")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.key} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{t(`maestro.features.${feature.key}.title`)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`maestro.features.${feature.key}.description`)}</p>
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
              <h3 className="text-xl font-semibold text-red-500/80">{t("maestro.challenges.heading")}</h3>
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
              <h3 className="text-xl font-semibold text-green-500/80">{t("maestro.solutions.heading")}</h3>
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
              {t("maestro.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("maestro.architecture.body")}
            </p>

            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-full space-y-4 text-left font-mono text-xs">
                  <div className="rounded border bg-background p-3">
                    <span className="font-bold text-blue-500">[CLI]</span> {t("maestro.architecture.diagram.cli")}
                  </div>
                  <div className="text-center text-muted-foreground">{t("maestro.architecture.diagram.arrow1")}</div>
                  <div className="rounded border bg-background p-3">
                    <span className="font-bold text-purple-500">[API FastAPI]</span> {t("maestro.architecture.diagram.api")}
                  </div>
                  <div className="text-center text-muted-foreground">{t("maestro.architecture.diagram.arrow2")}</div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-green-500">[ContextAgent]</span> {t("maestro.architecture.diagram.context")}
                    </div>
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-orange-500">[tools]</span> {t("maestro.architecture.diagram.tools")}
                    </div>
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-pink-500">[provider Codex]</span> {t("maestro.architecture.diagram.provider")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Segurança */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
              {t("maestro.security.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("maestro.security.intro")}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{t("maestro.security.item1")}</li>
              <li>{t("maestro.security.item2")}</li>
              <li>{t("maestro.security.item3")}</li>
            </ul>
          </section>
        </div>

        {/* Coluna Lateral (Metadados) */}
        <aside className="space-y-8">
          {/* Links de Ação */}
          <div className="flex flex-col gap-3">
            {projectData.links.github && (
              <Button size="lg" className="w-full font-semibold" asChild>
                <a href={projectData.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("maestro.links.github")}
                </a>
              </Button>
            )}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("maestro.labels.techStack")}</h3>
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
                <span className="text-muted-foreground">{t("maestro.labels.role")}</span>
                <span className="font-medium text-right">{t("maestro.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.period")}</span>
                <span className="font-medium">{t("maestro.date")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("maestro.labels.agents")}</span>
                <span className="font-medium text-primary">{t("maestro.agentsValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("maestro.labels.tests")}</span>
                <span className="font-medium">{t("maestro.testsValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-green-600">{t("maestro.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
