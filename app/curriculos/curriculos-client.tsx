"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye, FileText } from "lucide-react"
import { useContent } from "@/components/content-provider"

interface Curriculo {
  id: string
  arquivo: string
}

const curriculos: Curriculo[] = [
  { id: "geral", arquivo: "/curriculos/dayvid-santana-curriculo.pdf" },
]

export function CurriculosClient() {
  const { t } = useContent();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="mb-12 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{t("curriculos.title")}</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          {t("curriculos.intro")}
        </p>
      </div>

      {curriculos.length === 0 ? (
        <p className="text-muted-foreground">{t("curriculos.empty")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {curriculos.map((curriculo) => (
            <Card key={curriculo.id} className="flex flex-col">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline">{t(`curriculos.${curriculo.id}.idioma`)}</Badge>
                  <span className="text-xs text-muted-foreground">{t("curriculos.updatedPrefix")} {t(`curriculos.${curriculo.id}.atualizado`)}</span>
                </div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 shrink-0 text-primary" />
                  {t(`curriculos.${curriculo.id}.titulo`)}
                </CardTitle>
                <CardDescription>{t(`curriculos.${curriculo.id}.descricao`)}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <a href={curriculo.arquivo} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    {t("curriculos.view")}
                  </a>
                </Button>
                <Button className="flex-1" asChild>
                  <a href={curriculo.arquivo} download>
                    <Download className="mr-2 h-4 w-4" />
                    {t("curriculos.download")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
