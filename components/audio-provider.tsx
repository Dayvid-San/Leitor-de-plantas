"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState, useRef } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playDoorSound: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("audioMuted");
    if (stored !== null) {
      setIsMuted(stored === "true");
    }

    const audio = new Audio("/assets/sounds/door-close-futuristic.ogg");
    audio.preload = "auto";
    audio.volume = 0.5;

    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("audioMuted", String(isMuted));
  }, [isMuted, mounted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playDoorSound = async () => {
    if (isMuted || !audioRef.current) return;

    try {
      const audio = audioRef.current;
      audio.volume = 0.5; // Garante o volume inicial
      audio.currentTime = 0; // Reinicia o áudio
      await audio.play();

      // Inicia o processo de encerramento aos 1.2 segundos (1200ms)
      // para completar o ciclo total em 1.5 segundos
      setTimeout(() => {
        if (!audio) return;

        const fadeInterval = setInterval(() => {
          // Se o volume ainda for maior que 0.05, diminui gradualmente
          if (audio.volume > 0.05) {
            audio.volume = Math.max(0, audio.volume - 0.05);
          } else {
            // Quando o volume estiver quase no zero, pausa e limpa o intervalo
            audio.pause();
            clearInterval(fadeInterval);
            audio.volume = 0.5; // Reseta o volume para a próxima execução
          }
        }, 30); // Frequência do fade (mais rápido = mais suave)
      }, 1200);
    } catch (error) {
      console.log("[Audio] Playback blocked or failed:", error);
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playDoorSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
}
