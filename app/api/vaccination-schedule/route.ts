import type { NextRequest } from "next/server"
import {
  getVaccinationsByAgeGroup,
  getVaccinationById,
  getEssentialVaccinations,
  vaccinationSchedule,
} from "@/lib/vaccination-database"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ageGroup = searchParams.get("ageGroup")
    const id = searchParams.get("id")
    const essentialOnly = searchParams.get("essential") === "true"
    const language = searchParams.get("language") || "en"

    // Get specific vaccination by ID
    if (id) {
      const vaccination = getVaccinationById(id)
      if (!vaccination) {
        return Response.json({ error: "Vaccination not found" }, { status: 404 })
      }
      return Response.json({ vaccination, language })
    }

    // Get essential vaccinations only
    if (essentialOnly) {
      const vaccinations = getEssentialVaccinations()
      return Response.json({ vaccinations, language, filter: "essential" })
    }

    // Get vaccinations by age group
    if (ageGroup && ageGroup !== "all") {
      const vaccinations = getVaccinationsByAgeGroup(ageGroup as any)
      return Response.json({ vaccinations, ageGroup, language })
    }

    // Return organized schedule by age groups (existing functionality)
    const vaccinationScheduleData = {
      infants: getVaccinationsByAgeGroup("infant"),
      children: getVaccinationsByAgeGroup("child"),
      adolescents: getVaccinationsByAgeGroup("adolescent"),
      adults: getVaccinationsByAgeGroup("adult"),
      elderly: getVaccinationsByAgeGroup("elderly"),
    }

    return Response.json({
      schedule: vaccinationScheduleData,
      allVaccinations: vaccinationSchedule,
      language,
      lastUpdated: new Date().toISOString(),
      source: "Ministry of Health & Family Welfare",
    })
  } catch (error) {
    console.error("Vaccination schedule API error:", error)
    return Response.json({ error: "Failed to fetch vaccination schedule" }, { status: 500 })
  }
}
