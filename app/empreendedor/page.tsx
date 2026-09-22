"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Target, Users, TrendingUp } from "lucide-react"
import { useContent } from "@/components/content-provider"

const principles = [
  { key: "money", icon: TrendingUp },
  { key: "education", icon: Lightbulb },
  { key: "community", icon: Users },
  { key: "startups", icon: Target },
]

const storyKeys = ["empreendedor.story.p1", "empreendedor.story.p2", "empreendedor.story.p3", "empreendedor.story.p4", "empreendedor.story.p5", "empreendedor.story.p6"]

export default function EmpreendedorPage() {
  const { t } = useContent();
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">{t("empreendedor.title")}</h1>

        {/* História & Trajetória */}
        <div className="space-y-6 mb-12 text-lg text-muted-foreground text-pretty leading-relaxed">
          {storyKeys.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </div>

        {/* Princípios Empreendedores */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">{t("empreendedor.principles.heading")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <Card key={principle.key}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <principle.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t(`empreendedor.principles.${principle.key}.title`)}</CardTitle>
                  </div>
                  <CardDescription>{t(`empreendedor.principles.${principle.key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Visão */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">{t("empreendedor.vision.heading")}</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground leading-relaxed">
                {t("empreendedor.vision.body")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
