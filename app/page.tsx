"use client"

import { useLanguage } from "@/lib/language-context"
import { useAccessibility } from "@/lib/accessibility-context"
import { AccessibilityPanel } from "@/components/accessibility-panel"
import {
  Heart,
  Home,
  MessageCircle,
  BookOpen,
  MapPin,
  Stethoscope,
  Calendar,
  Search,
  ZoomIn,
  Eye,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const { currentLanguage, setLanguage, t } = useLanguage()
  const { setAccessibilityPanelOpen, speak, settings } = useAccessibility()

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  ]

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const handleAccessibilityAction = (action: string) => {
    switch (action) {
      case "search":
        speak("Search functionality activated")
        break
      case "zoom":
        const currentSize = settings.fontSize
        const sizes = ["small", "medium", "large", "extra-large"] as const
        const currentIndex = sizes.indexOf(currentSize)
        const nextSize = sizes[(currentIndex + 1) % sizes.length]
        speak(`Font size changed to ${nextSize}`)
        break
      case "contrast":
        speak("High contrast mode toggled")
        break
      case "voice":
        speak("Voice navigation activated. You can now use voice commands to navigate.")
        break
      default:
        break
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Arogya Health Bot</h1>
              <p className="text-sm text-slate-600">Your AI Healthcare Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <span className="text-sm">🌐</span>
            </div>
            <select
              value={currentLanguage}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Select language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <Card className="p-6 bg-cyan-50 border-cyan-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-700">{t("accessibility") || "Accessibility"}</h2>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100"
                onClick={() => handleAccessibilityAction("search")}
                aria-label="Global search"
                title="Global search"
              >
                <Search className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100"
                onClick={() => handleAccessibilityAction("zoom")}
                aria-label="Increase font size"
                title="Increase font size"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100"
                onClick={() => handleAccessibilityAction("contrast")}
                aria-label="Toggle high contrast"
                title="Toggle high contrast"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-full bg-white hover:bg-slate-100"
                onClick={() => setAccessibilityPanelOpen(true)}
                aria-label="Advanced accessibility settings"
                title="Advanced accessibility settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-cyan-50 border-cyan-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-teal-600 text-white cursor-pointer hover:bg-teal-700 transition-colors focus-within:ring-2 focus-within:ring-teal-300">
              <div className="flex flex-col items-center gap-2">
                <Home className="w-6 h-6" />
                <span className="font-medium">{t("home") || "Home"}</span>
              </div>
            </Card>

            <Link href="/chat">
              <Card className="p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-teal-300">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">{t("askDoctor") || "Ask Doctor"}</span>
                </div>
              </Card>
            </Link>

            <Link href="/diseases">
              <Card className="p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-teal-300">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">{t("learnHealth") || "Learn Health"}</span>
                </div>
              </Card>
            </Link>

            <Link href="/hospitals">
              <Card className="p-4 bg-white hover:bg-slate-50 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-teal-300">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700">{t("hospitalsNearMe") || "Hospitals Near Me"}</span>
                </div>
              </Card>
            </Link>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/symptoms">
            <Card className="p-8 bg-cyan-50 border-cyan-200 hover:bg-cyan-100 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-teal-300">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {t("checkSymptoms") || "Check Symptoms"}
                  </h3>
                  <p className="text-slate-600">{t("tapToGetHelp") || "Tap to get help"}</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/vaccination">
            <Card className="p-8 bg-cyan-50 border-cyan-200 hover:bg-cyan-100 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-teal-300">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {t("vaccinationSchedule") || "Vaccination Schedule"}
                  </h3>
                  <p className="text-slate-600">{t("tapToGetHelp") || "Tap to get help"}</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </main>

      <AccessibilityPanel />
    </div>
  )
}
