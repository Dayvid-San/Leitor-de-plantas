"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Trophy,
  Coins,
  Crown,
  Briefcase,
} from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  heroImage: "/Captura-tytoclub.png",
  tags: [
    "React 19",
    "TypeScript",
    "Vite",
    "Tailwind CSS",
    "Firebase Auth",
    "Firestore",
    "React Router",
    "Radix UI",
  ],
  links: {
    demo: "https://club.tytocode.com.br",
    github: "https://github.com/TYTO-club",
  },
  challengeKeys: ["tyto.challenges.item1", "tyto.challenges.item2", "tyto.challenges.item3"],
  solutionKeys: ["tyto.solutions.item1", "tyto.solutions.item2", "tyto.solutions.item3"],
}

const features = [
  { key: "progression", icon: Trophy },
  { key: "economy", icon: Coins },
  { key: "governance", icon: Crown },
  { key: "projects", icon: Briefcase },
]

export default function TytoClub() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("tyto.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("tyto.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("tyto.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Imagem Principal / Hero */}
      <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
        <Image
          src={projectData.heroImage}
          alt={`Capa do ${t("tyto.title")}`}
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
              {t("tyto.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("tyto.overview.body")}</p>
          </section>

          <Separator />

          {/* O que a plataforma faz */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("tyto.features.heading")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.key} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{t(`tyto.features.${feature.key}.title`)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`tyto.features.${feature.key}.description`)}</p>
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
              <h3 className="text-xl font-semibold text-red-500/80">{t("tyto.challenges.heading")}</h3>
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
              <h3 className="text-xl font-semibold text-green-500/80">{t("tyto.solutions.heading")}</h3>
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
              {t("tyto.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("tyto.architecture.body")}
            </p>

            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-full space-y-4 text-xs font-mono text-left">
                  <div className="p-3 rounded border bg-background">
                    <span className="text-blue-500 font-bold">[Frontend]</span> {t("tyto.architecture.diagram.frontend")}
                  </div>
                  <div className="text-center text-muted-foreground">{t("tyto.architecture.diagram.arrow1")}</div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="p-3 rounded border bg-background">
                      <span className="text-purple-500 font-bold">[Firestore direto]</span> {t("tyto.architecture.diagram.firestore")}
                    </div>
                    <div className="p-3 rounded border bg-background">
                      <span className="text-green-500 font-bold">[Backend REST]</span> {t("tyto.architecture.diagram.backend")}
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground">{t("tyto.architecture.diagram.arrow2")}</div>
                  <div className="p-3 rounded border bg-background">
                    <span className="text-orange-500 font-bold">[firestore.rules]</span> {t("tyto.architecture.diagram.rules")}
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
              {t("tyto.security.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("tyto.security.intro")}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>{t("tyto.security.item1")}</li>
              <li>{t("tyto.security.item2")}</li>
            </ul>
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
                  {t("tyto.links.demo")}
                </a>
              </Button>
            )}
            {projectData.links.github && (
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={projectData.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  {t("tyto.links.github")}
                </a>
              </Button>
            )}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("tyto.labels.techStack")}</h3>
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
                <span className="text-muted-foreground">{t("tyto.labels.role")}</span>
                <span className="font-medium text-right">{t("tyto.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.period")}</span>
                <span className="font-medium">{t("tyto.date")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("tyto.labels.architecture")}</span>
                <span className="font-medium text-primary">{t("tyto.architectureValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-green-600">{t("tyto.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
