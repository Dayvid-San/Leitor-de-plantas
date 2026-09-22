"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, FlaskConical, Globe, Smartphone } from "lucide-react"
import { useContent } from "@/components/content-provider"

const skills = [
  { key: "frontend", icon: Code2, title: "Front-end", tags: ["React", "Angular", "Next.js", "TypeScript", "Tailwind"] },
  { key: "backend", icon: Database, title: "Back-end", tags: ["Node.js", "Java", "Python", "Spring Boot", "PostgreSQL", "MongoDB", "Redis"] },
  { key: "web", icon: Globe, title: "Outras Tecnologias Web", tags: ["REST", "GraphQL", "WebSockets"] },
  { key: "ai", icon: FlaskConical, title: "Inteligência Artificial", tags: ["ML", "DL", "CNN"] },
]

export default function ProgramadorPage() {
  const { t } = useContent();
  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">{t("programador.title")}</h1>
        <p className="mb-8 text-lg text-muted-foreground text-pretty whitespace-pre-line">
          {t("programador.intro")}
        </p>

        <div className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">{t("programador.skills.heading")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((skill) => (
              <Card key={skill.title}>
                <CardHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <skill.icon className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{t(`programador.skills.${skill.key}.title`)}</CardTitle>
                  </div>
                  <CardDescription>{t(`programador.skills.${skill.key}.description`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
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
        
	{/*
        <div>
          <h2 className="mb-6 text-2xl font-bold">Filosofia de Desenvolvimento</h2>
          <Card>
            <CardContent className="p-8">
              <ul className="space-y-4 text-muted-foreground leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Código limpo e manutenível:</strong> Escrevo código pensando em
                    quem vai ler e manter no futuro.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Performance primeiro:</strong> Otimizo desde o início, não como
                    uma reflexão tardia.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Acessibilidade universal:</strong> Construo aplicações que todos
                    possam usar, independente de suas capacidades.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>
                    <strong className="text-foreground">Aprendizado contínuo:</strong> A tecnologia evolui rapidamente,
                    e eu evoluo junto.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        */}
      </div>
    </div>
  )
}
