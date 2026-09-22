"use client";

import React, { CSSProperties } from "react";
import Image from "next/image";
import { TypewriterStatus } from "@/components/typeWriterStatus";
import { useContent } from "@/components/content-provider";

interface TransparentPhotoProps {
  imageUrl: string;
  opacity?: number;
  width?: string;
  height?: string;
  customStyles?: CSSProperties;
}

const currentYear = new Date().getFullYear();

const TransparentPhoto: React.FC<TransparentPhotoProps> = ({
  imageUrl,
  opacity = 0.3,
  width = "300px",
  height = "300px",
  customStyles = {},
}) => {
  const containerStyles: CSSProperties = {
    position: "relative",
    width,
    height,
    opacity,
    pointerEvents: "none",
    ...customStyles,
  };

  return (
    <div style={containerStyles} className="transition-opacity duration-700 gray-scale hover:opacity-40">
      <Image
        src={imageUrl}
        alt=""
        fill
        style={{ objectFit: "cover" }}
        priority
      />
    </div>
  );
};

// --- Dados Fixos ---

const projects = [
  { key: "plantas", title: "Monitor de Plantas", link: "/portfolio/plantas", icon: "🌱" },
  { key: "hefesto", title: "Hefesto", link: "/portfolio/hefesto", icon: "🔨", hasHighlight: true },
  { key: "maestro", title: "Maestro", link: "/portfolio/maestro", icon: "🎼" },
  { key: "engscan", title: "EngScan", link: "/portfolio/engscan", icon: "⚒️", hasHighlight: true },
  { key: "tyto", title: "TYTO", link: "/portfolio/tyto", icon: "🏰", hasHighlight: true },
  { key: "atenas", title: "Atenas", link: "/atenas", icon: "📚" },
  { key: "agora", title: "Ágora", link: "/portfolio/agora", icon: "🛍️" },
];

const skillKeys = ["home.skills.item2", "home.skills.item3", "home.skills.item4", "home.skills.item5"];

const languageKeys = ["home.languages.pt", "home.languages.en", "home.languages.ru", "home.languages.sergipanes", "home.languages.altovaliriano"];

// --- Componente Principal ---

export default function HomePage() {
  const { t } = useContent();
  const photoDayvid = "/emBeloHorizonteInteira.jpeg";
  const yearsOfExperience = currentYear - 2015;

  return (
    <main className="relative min-h-screen bg-[#000000] text-[#f3eade] font-sans antialiased overflow-x-hidden selection:bg-purple-700 selection:text-white">
      
      {/* Background Orbs de Iluminação Sutil */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-950/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-sky-900/40 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Foto de Fundo Flutuante Lateral */}
      <div className="fixed left-6 top-12 z-0 hidden lg:block border border-purple-950/40 rounded-2xl overflow-hidden shadow-2xl">
        <TransparentPhoto
          imageUrl={photoDayvid}
          opacity={0.15}
          width="23em"
          height="30em"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="space-y-16">
          
          {/* Header principal */}
          <header className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-400/80">
              {t("home.badge")}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-[#f3eade] via-purple-300 to-purple-500">
              DAYVID SANTANA
            </h1>
            <div className="mx-auto mt-4 max-w-xl border-y border-purple-950/40 py-2">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-purple-300/60">
                Software Engineer • AI Researcher • Systems Builder
              </p>
            </div>
          </header>

          {/* Grid: Sobre Mim & Presença */}
          <section className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3 bg-zinc-950/60 backdrop-blur-md border border-purple-950/40 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">{t("home.about.eyebrow")}</span>
                <h2 className="text-2xl font-bold text-purple-300 mt-1 mb-4">{t("home.about.heading")}</h2>
                <p className="text-sm leading-relaxed text-[#d1c5b6] font-light whitespace-pre-line">
                  {t("home.about.body")}
                </p>
              </div>
            </div>

            <div className="md:col-span-2 bg-gradient-to-br from-zinc-900/80 to-zinc-950/90 border border-purple-900/30 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">{t("home.manifesto.eyebrow")}</span>
                <h3 className="text-lg font-semibold text-purple-300 mt-1 mb-3">{t("home.manifesto.heading")}</h3>
                <p className="text-sm leading-relaxed text-[#c4b8aa] font-light whitespace-pre-line">
                  {t("home.manifesto.body")}
                </p>
              </div>
              
              <TypewriterStatus />
            </div>
          </section>

          {/* Projetos */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-purple-950/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">{t("home.projects.eyebrow")}</span>
                <h2 className="text-2xl font-bold text-purple-300">{t("home.projects.heading")}</h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <a href={project.link} key={project.title}>
                  <article
                    className="group relative overflow-hidden rounded-xl border border-purple-950/20 bg-zinc-950/40 p-6 transition-all duration-300 hover:border-purple-600/40 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-purple-950/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-purple-500">{t("home.projects.label")}</span>
                        <h3 className="text-base font-bold text-[#f3eade] group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-950/20 border border-purple-950/30 text-xl shadow-inner">
                        {project.icon}
                      </div>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#bfb3a4] font-light">
                      {t(`home.projects.${project.key}.description`)}
                    </p>

                    {project.hasHighlight ? (
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-[11px] font-medium text-purple-400">
                        {t(`home.projects.${project.key}.highlight`)}
                      </div>
                    ) : null}
                  </article>
                </a>
              ))}
            </div>
          </section>

          {/* Conhecimentos / Skills */}
          <section className="bg-zinc-950/40 border border-purple-950/30 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">{t("home.skills.eyebrow")}</span>
                <h3 className="text-xl font-bold text-purple-300">{t("home.skills.heading")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg border border-purple-950/40 bg-purple-950/10 px-3 py-1.5 text-xs font-mono text-purple-300/80 hover:border-purple-600/60 transition-colors">
                  {t("home.skills.item1").replace("{years}", String(yearsOfExperience))}
                </span>
                {skillKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-lg border border-purple-950/40 bg-purple-950/10 px-3 py-1.5 text-xs font-mono text-purple-300/80 hover:border-purple-600/60 transition-colors"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Idiomas / Domínio Linguístico */}
          <section className="bg-zinc-950/40 border border-purple-950/30 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-mono">{t("home.languages.eyebrow")}</span>
                <h3 className="text-xl font-bold text-purple-300">{t("home.languages.heading")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {languageKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-lg border border-purple-950/40 bg-purple-950/10 px-3 py-1.5 text-xs font-mono text-purple-300/80 hover:border-purple-600/60 transition-colors"
                  >
                    {t(key)}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col gap-4 border-t border-purple-950/30 pt-8 sm:flex-row sm:items-center sm:justify-between text-xs">
            <p className="font-mono text-purple-400/60 tracking-wider">
              {t("home.footer.quip")}
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.linkedin.com/in/dayvid-santana-jr/" target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-purple-950/30 rounded-md hover:border-purple-600/50 hover:bg-purple-950/10 transition-all text-[#c4b8aa] hover:text-[#f3eade]">
                LinkedIn
              </a>
              <a href="https://github.com/Dayvid-San" target="_blank" rel="noreferrer" className="px-3 py-1.5 border border-purple-950/30 rounded-md hover:border-purple-600/50 hover:bg-purple-950/10 transition-all text-[#c4b8aa] hover:text-[#f3eade]">
                GitHub
              </a>
              <a href="mailto:santana.dayvid@outlook.com" className="px-3 py-1.5 border border-purple-950/30 rounded-md hover:border-purple-600/50 hover:bg-purple-950/10 transition-all text-[#c4b8aa] hover:text-[#f3eade]">
                Email
              </a>
            </div>
          </footer>

        </div>
      </div>

      {/* Ilustração do Personagem/Avatar */}
      <div className="pointer-events-none fixed bottom-20 right-0 z-20 hidden opacity-80 lg:block">
        <Image
          src="/1768628437181-removebg-preview.png"
          alt="Dayvid Santana Avatar"
          width={300}
          height={300}
          className="object-contain"
          priority
        />
      </div>

    </main>
  );
}