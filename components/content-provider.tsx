"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getPublicContent } from "@/lib/api";
import { CONTENT_KEYS_BY_KEY } from "@/lib/content-registry";

export type Locale = "pt" | "en";

const LOCALE_STORAGE_KEY = "visitcard_locale";

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "pt";
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

interface ContentContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [contentMap, setContentMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null) : null;
    setLocaleState(stored ?? detectBrowserLocale());
  }, []);

  useEffect(() => {
    getPublicContent(locale)
      .then(setContentMap)
      .catch((error) => console.error("Error fetching content: ", error));
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: string) => contentMap[key] ?? CONTENT_KEYS_BY_KEY[key]?.defaultPt ?? key,
    [contentMap]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
