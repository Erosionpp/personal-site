"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import zh from "@/messages/zh.json";
import en from "@/messages/en.json";

type Locale = "zh" | "en";

const messages = { zh, en } as const;

type Messages = typeof zh;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, t: messages[locale] as Messages }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
