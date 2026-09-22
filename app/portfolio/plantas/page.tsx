"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Layers,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Droplet,
  Camera,
  BellRing,
  Wifi,
} from "lucide-react"
import { useContent } from "@/components/content-provider"

const projectData = {
  tags: [
    "ESP-IDF (C)",
    "ESP32",
    "ESP32-CAM",
    "Java",
    "Javalin",
    "SQLite (JDBC)",
    "WebSocket",
    "Web Push",
    "PWA",
    "Chart.js",
  ],
  challengeKeys: ["plantas.challenges.item1", "plantas.challenges.item2", "plantas.challenges.item3"],
  solutionKeys: ["plantas.solutions.item1", "plantas.solutions.item2", "plantas.solutions.item3"],
}

const features = [
  { key: "watering", icon: Droplet },
  { key: "photos", icon: Camera },
  { key: "push", icon: BellRing },
  { key: "realtime", icon: Wifi },
]

const demoPlants = [
  { nome: "Samambaia", umidade: 62, statusKey: "plantas.demo.status.healthy", cor: "green", wateredKey: "plantas.demo.watered.fern" },
  { nome: "Suculenta", umidade: 45, statusKey: "plantas.demo.status.attention", cor: "yellow", wateredKey: "plantas.demo.watered.succulent" },
  { nome: "Jiboia", umidade: 28, statusKey: "plantas.demo.status.dry", cor: "orange", wateredKey: "plantas.demo.watered.pothos" },
]

export default function MonitorDePlantas() {
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
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("plantas.title")}</h1>
            <p className="text-xl text-muted-foreground">{t("plantas.subtitle")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm py-1 px-3">
              {t("plantas.date")}
            </Badge>
          </div>
        </div>
      </div>

      {/* Dashboard Hero (sem screenshot: não existe nenhuma pronta) */}
      <div className="relative mb-12 w-full overflow-hidden rounded-xl border bg-zinc-950 shadow-sm">
        <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-zinc-500">Monitor de Plantas - dashboard</span>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {demoPlants.map((planta) => (
            <div key={planta.nome} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>{planta.nome}</span>
                <span
                  className={
                    planta.cor === "green"
                      ? "text-green-400"
                      : planta.cor === "yellow"
                        ? "text-yellow-400"
                        : "text-orange-400"
                  }
                >
                  ● {t(planta.statusKey)}
                </span>
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                <span className="text-2xl font-bold text-zinc-100">{planta.umidade}%</span>
                <span className="mb-1 text-[11px] text-zinc-500">{t("plantas.demo.humidity")}</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-800">
                <div
                  className={
                    "h-1.5 rounded-full " +
                    (planta.cor === "green" ? "bg-green-500" : planta.cor === "yellow" ? "bg-yellow-500" : "bg-orange-500")
                  }
                  style={{ width: `${planta.umidade}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500">{t(planta.wateredKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_300px] lg:gap-16">
        {/* Coluna Principal (Conteúdo) */}
        <div className="space-y-12">
          {/* Visão Geral */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <Layers className="mr-2 h-6 w-6 text-primary" />
              {t("plantas.overview.heading")}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t("plantas.overview.body")}</p>
          </section>

          <Separator />

          {/* O que o sistema faz */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">{t("plantas.features.heading")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.key} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h4 className="font-bold text-sm mb-1">{t(`plantas.features.${feature.key}.title`)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{t(`plantas.features.${feature.key}.description`)}</p>
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
              <h3 className="text-xl font-semibold text-red-500/80">{t("plantas.challenges.heading")}</h3>
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
              <h3 className="text-xl font-semibold text-green-500/80">{t("plantas.solutions.heading")}</h3>
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
              {t("plantas.architecture.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("plantas.architecture.body")}
            </p>

            <Card className="overflow-hidden border-dashed bg-slate-50 dark:bg-slate-950/50">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-full space-y-4 text-left font-mono text-xs">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-blue-500">[ESP32 + bombas]</span> {t("plantas.architecture.diagram.esp32")}
                    </div>
                    <div className="rounded border bg-background p-3">
                      <span className="font-bold text-pink-500">[ESP32-CAM]</span> {t("plantas.architecture.diagram.cam")}
                    </div>
                  </div>
                  <div className="text-center text-muted-foreground">{t("plantas.architecture.diagram.arrow1")}</div>
                  <div className="rounded border bg-background p-3">
                    <span className="font-bold text-purple-500">[Backend Java/Javalin]</span> {t("plantas.architecture.diagram.backend")}
                  </div>
                  <div className="text-center text-muted-foreground">{t("plantas.architecture.diagram.arrow2")}</div>
                  <div className="rounded border bg-background p-3">
                    <span className="font-bold text-green-500">[Dashboard PWA]</span> {t("plantas.architecture.diagram.dashboard")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Limitações Honestas */}
          <section className="space-y-4">
            <h2 className="flex items-center text-2xl font-bold tracking-tight">
              <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
              {t("plantas.limitations.heading")}
            </h2>
            <p className="text-muted-foreground">
              {t("plantas.limitations.intro")}
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>{t("plantas.limitations.item1")}</li>
              <li>{t("plantas.limitations.item2")}</li>
              <li>
                {t("plantas.limitations.item3Prefix")} <code>Connection</code> {t("plantas.limitations.item3Suffix")}
              </li>
              <li>{t("plantas.limitations.item4")}</li>
            </ul>
          </section>
        </div>

        {/* Coluna Lateral (Metadados) */}
        <aside className="space-y-8">
          <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
            {t("plantas.noLinkNotice")}
          </div>

          {/* Tecnologias */}
          <div className="space-y-4 rounded-lg border p-6 shadow-sm">
            <h3 className="font-semibold">{t("plantas.labels.techStack")}</h3>
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
                <span className="text-muted-foreground">{t("plantas.labels.role")}</span>
                <span className="font-medium text-right">{t("plantas.role")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.period")}</span>
                <span className="font-medium">{t("plantas.date")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("plantas.labels.parts")}</span>
                <span className="font-medium text-primary">{t("plantas.partsValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("plantas.labels.database")}</span>
                <span className="font-medium">{t("plantas.databaseValue")}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("projectDetail.status")}</span>
                <span className="font-medium text-green-600">{t("plantas.status")}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
