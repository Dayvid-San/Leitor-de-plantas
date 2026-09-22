"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const routeAnnouncements: Record<string, string> = {
  //"/": "...Olá! Meu nome é Ártemes e vou lhe guiar por aqui. Caso queira desativar minha voz, clique no botão com para desligar o som da página!",
  //"/portfolio": "...Essa é uma seleção dos projetos de Dayvid como programador e pesquisador. Aqui você verá tanto projetos acadêmicos de pesquisa quanto projetos pessoais que contruiram de forma signícativa na vida das pessoas. Por questão de contrato, Dayvid não pode dar detalhes sobre os seus projetos.",
};

export function useVoiceAnnouncement() {
  const pathname = usePathname();

  useEffect(() => {
    if ("speechSynthesis" in window) {
      // 1. Buscamos o texto específico da rota
      const announcement = routeAnnouncements[pathname];

      // 2. Só prosseguimos se houver um texto definido para esta rota
      if (announcement) {
        const timer = setTimeout(() => {
          // Cancela falas anteriores antes de começar uma nova
          speechSynthesis.cancel();

          const utterance = new SpeechSynthesisUtterance(announcement);

          utterance.lang = "pt-BR";
          utterance.rate = 1.2;
          utterance.pitch = 1;
          utterance.volume = 0.8;

          const voices = speechSynthesis.getVoices();
          const portugueseVoice = voices.find((voice) =>
            voice.lang.startsWith("pt")
          );
          
          if (portugueseVoice) {
            utterance.voice = portugueseVoice;
          }

          speechSynthesis.speak(utterance);
        }, 500);

        return () => {
          clearTimeout(timer);
          speechSynthesis.cancel();
        };
      }
    }
  }, [pathname]);
}