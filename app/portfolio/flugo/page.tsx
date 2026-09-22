"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, Cpu, CheckCircle2, UserPlus } from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  heroImage: "/FlugoPrint.png",
  tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Zod", "React Hook Form"],
  links: {
    demo: "https://formulario-flugo.vercel.app",
    github: "https://github.com/Dayvid-San/Formulario-Flugo",
  },
  challengeKeys: ["flugo.challenges.item1", "flugo.challenges.item2", "flugo.challenges.item3"],
  solutionKeys: ["flugo.solutions.item1", "flugo.solutions.item2", "flugo.solutions.item3"],
}

export default function FlugoProject() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("flugo.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("flugo.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-sm py-1 px-3">
              {t("flugo.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Imagem Principal */}
      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
        <Image
          src={projectData.heroImage}
          alt={`Interface do projeto ${t("flugo.title")}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_300px] lg:gap-16">

        {/* Coluna Principal */}
        <div className="space-y-12">

          {/* Visão Geral */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <UserPlus className="mr-2 h-6 w-6 text-primary" />
              {t("flugo.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              {t("flugo.overview.body")}
            </p>
          </section>

          <Separator />

          {/* Desafios e Soluções */}
          <section className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-500/90">{t("flugo.challenges.heading")}</h3>
              <ul className="space-y-3">
                {projectData.challengeKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-500/90">{t("flugo.solutions.heading")}</h3>
              <ul className="space-y-3">
                {projectData.solutionKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-500" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Separator />

          {/* Fluxo de Dados */}
          <section className="space-y-6">
             <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Cpu className="mr-2 h-6 w-6 text-primary" />
              {t("flugo.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("flugo.architecture.body")}
            </p>

            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex aspect-[16/9] flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                   <span className="text-sm italic">
                    {t("flugo.architecture.placeholder")}
                   </span>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Coluna Lateral */}
        <aside className="space-y-8">

          <div className="flex flex-col gap-3">
            {projectData.links.demo && (
              <Button size="lg" className="w-full font-semibold bg-primary hover:bg-primary/90" asChild>
                <a href={projectData.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t("flugo.links.demo")}
                </a>
              </Button>
            )}
            {projectData.links.github && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={projectData.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("flugo.links.github")}
                </a>
              </Button>
            )}
          </div>

          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("flugo.labels.techStack")}</h3>
            <div className="flex flex-wrap gap-2">
              {projectData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-lg border bg-muted/30 p-6">
            <h3 className="font-semibold">{t("projectDetail.techSheet")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("flugo.labels.role")}</span>
                <span className="font-medium text-right">{t("flugo.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("flugo.labels.year")}</span>
                <span className="font-medium">{t("flugo.date")}</span>
              </div>
              <Separator />
               <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-blue-600">{t("flugo.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
