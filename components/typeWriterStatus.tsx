'use client'
import React, { useState, useEffect, useRef } from "react";
import { listStatusItems, type ApiStatusItem } from "@/lib/api";
import { useContent } from "@/components/content-provider";

interface StatusLine {
  id: string;
  text: string;
}

function toStatusLine(item: ApiStatusItem): StatusLine {
  const text = item.icon ? `${item.icon} ${item.label}: ${item.value}` : `${item.label}: ${item.value}`;
  return { id: item.id, text };
}

export const TypewriterStatus: React.FC = () => {
  const { t } = useContent();
  const [statusItems, setStatusItems] = useState<StatusLine[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState<string>("");
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    listStatusItems()
      .then((items) => setStatusItems(items.map(toStatusLine)))
      .catch((error) => console.error("Error fetching status items: ", error));
  }, []);

  // Observa quando o elemento entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Efeito de digitação caractere por caractere
  useEffect(() => {
    if (!hasStarted || statusItems.length === 0 || currentLineIndex >= statusItems.length) return;

    const fullText = statusItems[currentLineIndex].text;

    if (currentLineText.length < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentLineText(fullText.slice(0, currentLineText.length + 1));
      }, 100); // Velocidade da digitação em ms

      return () => clearTimeout(timer);
    } else {
      // Quando termina uma linha, passa para a próxima
      const nextLineTimer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentLineText("");
      }, 250); 

      return () => clearTimeout(nextLineTimer);
    }
  }, [hasStarted, currentLineIndex, currentLineText]);

  return (
    <div
      ref={containerRef}
      className="mt-6 border border-purple-950/50 rounded-xl bg-black/40 p-3 font-mono text-[11px] text-purple-400/80 space-y-1"
    >
      <div className="flex justify-between border-b border-purple-950/30 pb-1">
        <span>{t("home.status.title")}</span>
        <span className="text-purple-500">{t("home.status.version")}</span>
      </div>

      <div className="pt-1 text-[#a69a8a] space-y-0.5 min-h-[80px]">
        {/* Linhas já totalmente digitadas */}
        {statusItems.slice(0, visibleCount).map((item) => (
          <p key={item.id}>{item.text}</p>
        ))}

        {/* Linha sendo digitada atualmente + Cursor */}
        {currentLineIndex < statusItems.length && hasStarted && (
          <p key={statusItems[currentLineIndex].id}>
            {currentLineText}
            <span className="inline-block w-1.5 h-3 ml-0.5 bg-purple-400 animate-pulse align-middle" />
          </p>
        )}
      </div>
    </div>
  );
};