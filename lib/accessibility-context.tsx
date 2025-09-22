"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "extra-large"
  highContrast: boolean
  screenReader: boolean
  voiceNavigation: boolean
  reducedMotion: boolean
  colorBlindMode: "none" | "protanopia" | "deuteranopia" | "tritanopia"
  keyboardNavigation: boolean
}

interface AccessibilityContextType {
  settings: AccessibilitySettings
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void
  resetSettings: () => void
  speak: (text: string) => void
  isAccessibilityPanelOpen: boolean
  setAccessibilityPanelOpen: (open: boolean) => void
}

const defaultSettings: AccessibilitySettings = {
  fontSize: "medium",
  highContrast: false,
  screenReader: false,
  voiceNavigation: false,
  reducedMotion: false,
  colorBlindMode: "none",
  keyboardNavigation: true,
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isAccessibilityPanelOpen, setAccessibilityPanelOpen] = useState(false)
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("accessibility-settings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error("Error loading accessibility settings:", error)
      }
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechSynthesis(window.speechSynthesis)
    }
  }, [])

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))

    // Apply settings to document
    applyAccessibilitySettings(settings)
  }, [settings])

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement

    // Font size
    root.classList.remove("text-small", "text-medium", "text-large", "text-extra-large")
    root.classList.add(`text-${settings.fontSize}`)

    // High contrast
    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }

    // Color blind mode
    root.classList.remove("protanopia", "deuteranopia", "tritanopia")
    if (settings.colorBlindMode !== "none") {
      root.classList.add(settings.colorBlindMode)
    }

    // Keyboard navigation
    if (settings.keyboardNavigation) {
      root.classList.add("keyboard-navigation")
    } else {
      root.classList.remove("keyboard-navigation")
    }
  }

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  const speak = (text: string) => {
    if (speechSynthesis && settings.screenReader) {
      speechSynthesis.cancel() // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        speak,
        isAccessibilityPanelOpen,
        setAccessibilityPanelOpen,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}
