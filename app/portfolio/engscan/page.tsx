"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, Layers, Cpu, CheckCircle2 } from "lucide-react"
import { useContent } from "@/components/content-provider"

// Dados do Projeto (EngScan) - Isso viria de um banco de dados ou CMS em produção
const projectData = {
  heroImage: "/Captura de tela_2025-08-26_12-17-41.png", // Sua imagem existente
  tags: ["Nest.js", "Angular", "Python", "TensorFlow", "Tailwind", "PostgreSQL", "RabbitMQ", "Docker"],
  links: {
    demo: "https://engscan.com",
    github: "https://github.com/EngScan",
  },
  challengeKeys: ["engscan.challenges.item1", "engscan.challenges.item2", "engscan.challenges.item3"],
  solutionKeys: ["engscan.solutions.item1", "engscan.solutions.item2", "engscan.solutions.item3"],
}

export default function EngScan() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("engscan.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("engscan.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("engscan.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Imagem Principal / Hero */}
      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
        <Image
          src={projectData.heroImage}
          alt={`Capa do projeto ${t("engscan.title")}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_300px] lg:gap-16">

        {/* Coluna Principal (Conteúdo) */}
        <div className="space-y-12">

          {/* Visão Geral */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              {t("engscan.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("engscan.overview.body")}
            </p>
          </section>

          <Separator />

          {/* Desafios e Soluções */}
          <section className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-500/80">{t("engscan.challenges.heading")}</h3>
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
              <h3 className="text-xl font-semibold text-green-500/80">{t("engscan.solutions.heading")}</h3>
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
              {t("engscan.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("engscan.architecture.body")}
            </p>

            {/* Placeholder para Diagrama de Arquitetura */}
            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex aspect-[16/9] flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                   <span className="text-sm italic">
                    {t("engscan.architecture.placeholder")}
                   </span>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Coluna Lateral (Metadados) */}
        <aside className="space-y-8">

          {/* Links de Ação */}
          <div className="flex flex-col gap-3">
            {projectData.links.demo && (
              <Button size="lg" className="w-full font-semibold" asChild>
                <a href={projectData.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("engscan.links.demo")}
                </a>
              </Button>
            )}
            {projectData.links.github && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={projectData.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("engscan.links.github")}
                </a>
              </Button>
            )}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("engscan.labels.techStack")}</h3>
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
                <span className="text-muted-foreground">{t("engscan.labels.role")}</span>
                <span className="font-medium text-right">{t("engscan.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("engscan.labels.year")}</span>
                <span className="font-medium">{t("engscan.date")}</span>
              </div>
              <Separator />
               <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-green-600">{t("engscan.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
