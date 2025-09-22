"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { type Language, getTranslation, type TranslationKey } from "./translations"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string | string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("healthcare-language", language)
    }
  }

  const t = (key: TranslationKey) => {
    return getTranslation(currentLanguage, key)
  }

  // Load saved language on mount
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("healthcare-language") as Language
      if (saved && ["en", "hi", "or"].includes(saved)) {
        setCurrentLanguage(saved)
      }
    }
  })

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
