import type { NextRequest } from "next/server"
import { searchDiseases, getDiseaseById, getDiseasesByCategory, getDiseasesBySeverity } from "@/lib/disease-database"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")
    const id = searchParams.get("id")
    const category = searchParams.get("category")
    const severity = searchParams.get("severity")
    const language = searchParams.get("language") || "en"

    // Get specific disease by ID
    if (id) {
      const disease = getDiseaseById(id)
      if (!disease) {
        return Response.json({ error: "Disease not found" }, { status: 404 })
      }
      return Response.json({ disease, language })
    }

    // Filter by category
    if (category) {
      const diseases = getDiseasesByCategory(category as any)
      return Response.json({ diseases, category, language })
    }

    // Filter by severity
    if (severity) {
      const diseases = getDiseasesBySeverity(severity as any)
      return Response.json({ diseases, severity, language })
    }

    // Search diseases
    if (query) {
      const diseases = searchDiseases(query, language)
      return Response.json({ diseases, query, language })
    }

    // Return all diseases if no specific filter
    const diseases = searchDiseases("", language)
    return Response.json({ diseases, language })
  } catch (error) {
    console.error("Disease API error:", error)
    return Response.json({ error: "Failed to fetch disease information" }, { status: 500 })
  }
}
