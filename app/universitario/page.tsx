"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, FlaskConical, Award } from "lucide-react"
import { useContent } from "@/components/content-provider"

const researchAreas = [
  { key: "civil", icon: Award, tags: ["ML", "Deep Learning", "NLP", "CNN", "Python"] },
  { key: "blockchain", icon: BookOpen, tags: ["BEP-20", "Solidity", "Spring Boot", "Web3j", "PostgreSQL", "IPFS"] },
  { key: "animal", icon: FlaskConical, tags: ["Microcontroladores", "Python", "C"] },
  { key: "applied", icon: GraduationCap, tags: ["Applied Research", "Innovation", "Impact"] },
]

const storyKeys = ["universitario.story.p1", "universitario.story.p2", "universitario.story.p3", "universitario.story.p4", "universitario.story.p5"]

export default function UniversitarioPage() {
  const { t } = useContent();
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">{t("universitario.title")}</h1>

        {/* Universidade e Construção de Comunidades */}
        <div className="space-y-6 mb-12 text-lg text-muted-foreground text-pretty leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">{t("universitario.story.heading")}</h2>
          {storyKeys.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </div>

        {/* Áreas de Pesquisa */}
        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">{t("universitario.research.heading")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {researchAreas.map((area) => (
              <Card key={area.key}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <area.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t(`universitario.research.${area.key}.title`)}</CardTitle>
                  </div>
                  <CardDescription>{t(`universitario.research.${area.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {area.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contribuições Acadêmicas */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">{t("universitario.contributions.heading")}</h2>
          <Card>
            <CardContent className="p-8">
              <p className="mb-4 text-muted-foreground leading-relaxed">
                {t("universitario.contributions.p1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("universitario.contributions.p2")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
