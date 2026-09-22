"use client";

import { useState, useEffect } from "react";
import { listProjects } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FileText } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/components/content-provider";

interface ProgrammerProject {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  role: string;
  github: string;
  demo?: string;
}

interface ResearchProject {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  date: string;
  role: string;
  paper?: string;
  dataset?: string;
  github?: string;
}

export default function PortfolioPage() {
  const { t } = useContent();
  const [programmerProjects, setProgrammerProjects] = useState<ProgrammerProject[]>([]);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [progList, researchList] = await Promise.all([
          listProjects("programmer"),
          listProjects("research"),
        ]);

        setProgrammerProjects(progList as ProgrammerProject[]);
        setResearchProjects(researchList as ResearchProject[]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg animate-pulse">{t("portfolio.loading")}</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">
          {t("portfolio.title")}
        </h1>
        <p className="mb-16 text-lg text-muted-foreground text-pretty">
          {t("portfolio.intro")}
        </p>

        <section className="mb-24">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-3xl font-bold">{t("portfolio.programmer.heading")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {programmerProjects.map((project) => (
              <Card
                key={project.id || project.title}
                className="flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline">{project.date}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t("portfolio.button.details")}
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Researcher Section */}
        <section>
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-3xl font-bold">{t("portfolio.researcher.heading")}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {researchProjects.map((project) => (
              <Card
                key={project.id || project.title}
                className="flex flex-col overflow-hidden"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="outline">{project.date}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {project.role}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.paper && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Paper
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t("portfolio.button.details")}
                        </a>
                      </Button>
                    )}
                    {project.dataset && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.dataset}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Dataset
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}