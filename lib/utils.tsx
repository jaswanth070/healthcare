import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { VaccinationRecord } from "./vaccination-database"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTranslatedContent(
  vaccine: VaccinationRecord,
  field: keyof VaccinationRecord["translations"]["en"],
  currentLanguage = "en",
) {
  if (currentLanguage !== "en" && vaccine.translations[currentLanguage]) {
    return vaccine.translations[currentLanguage][field]
  }
  return vaccine[field as keyof VaccinationRecord]
}

export function getImportanceColor(importance: string) {
  switch (importance) {
    case "essential":
      return "bg-red-100 text-red-800 border-red-200"
    case "recommended":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "optional":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function getImportanceIcon(importance: string) {
  switch (importance) {
    case "essential":
      return <AlertTriangle className="w-4 h-4" />
    case "recommended":
      return <CheckCircle className="w-4 h-4" />
    case "optional":
      return <Clock className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}
