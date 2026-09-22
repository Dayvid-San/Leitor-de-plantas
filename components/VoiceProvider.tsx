"use client";

import { useVoiceAnnouncement } from "@/hooks/useVoiceAnnouncement";
import type React from "react";

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  useVoiceAnnouncement();
  return <>{children}</>;
}
