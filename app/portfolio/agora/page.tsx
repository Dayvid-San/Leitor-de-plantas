"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  TrendingUp,
  Database,
  MapPin,
  LineChart,
} from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  tags: ["Modelagem Estatística", "Machine Learning", "Backtesting", "Dados Geoespaciais", "Análise Macroeconômica"],
  challengeKeys: ["agora.challenges.item1", "agora.challenges.item2", "agora.challenges.item3"],
  solutionKeys: ["agora.solutions.item1", "agora.solutions.item2", "agora.solutions.item3"],
}

const features = [
  { key: "prediction", icon: TrendingUp },
  { key: "data", icon: Database },
  { key: "proximity", icon: MapPin },
  { key: "scenarios", icon: LineChart },
]

export default function Agora() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("agora.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("agora.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("agora.date")}
            </Badge>
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
              {t("agora.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("agora.overview.body")}</p>
          </section>

          <Separator />

          {/* O que a plataforma propõe */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("agora.features.heading")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.key} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{t(`agora.features.${feature.key}.title`)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`agora.features.${feature.key}.description`)}</p>
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
              <h3 className="text-xl font-semibold text-red-500/80">{t("agora.challenges.heading")}</h3>
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
              <h3 className="text-xl font-semibold text-green-500/80">{t("agora.solutions.heading")}</h3>
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

        </div>

        {/* Coluna Lateral (Metadados) */}
        <aside className="space-y-8">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            {t("agora.noLinkNotice")}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("agora.labels.techStack")}</h3>
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
                <span className="text-muted-foreground">{t("agora.labels.role")}</span>
                <span className="font-medium text-right">{t("agora.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.period")}</span>
                <span className="font-medium">{t("agora.date")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-orange-500">{t("agora.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
