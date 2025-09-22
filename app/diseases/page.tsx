"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, AlertTriangle, Info, Heart, Stethoscope, Home, Skull, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { DiseaseInfo } from "@/lib/disease-database"
import Link from "next/link"

export default function DiseasesPage() {
  const { currentLanguage, t } = useLanguage()
  const [diseases, setDiseases] = useState<DiseaseInfo[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  const currentDeadlyDiseases = [
    {
      name: "COVID-19",
      description: "Respiratory illness caused by SARS-CoV-2 virus",
      mortality: "High",
      spread: "Airborne transmission",
      prevention: ["Vaccination", "Mask wearing", "Social distancing", "Hand hygiene"],
    },
    {
      name: "Heart Disease",
      description: "Leading cause of death globally",
      mortality: "Very High",
      spread: "Non-communicable",
      prevention: ["Healthy diet", "Regular exercise", "No smoking", "Stress management"],
    },
    {
      name: "Cancer",
      description: "Uncontrolled cell growth in various organs",
      mortality: "Very High",
      spread: "Non-communicable",
      prevention: ["Regular screening", "Healthy lifestyle", "Avoid carcinogens", "Early detection"],
    },
    {
      name: "Stroke",
      description: "Blood flow interruption to the brain",
      mortality: "High",
      spread: "Non-communicable",
      prevention: ["Blood pressure control", "Healthy diet", "Regular exercise", "No smoking"],
    },
    {
      name: "Diabetes",
      description: "Blood sugar regulation disorder",
      mortality: "Moderate",
      spread: "Non-communicable",
      prevention: ["Healthy diet", "Weight management", "Regular exercise", "Regular monitoring"],
    },
    {
      name: "Tuberculosis",
      description: "Bacterial infection primarily affecting lungs",
      mortality: "High",
      spread: "Airborne transmission",
      prevention: ["BCG vaccination", "Good ventilation", "Early treatment", "Contact screening"],
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "infectious", label: "Infectious Diseases" },
    { value: "chronic", label: "Chronic Diseases" },
    { value: "respiratory", label: "Respiratory" },
    { value: "digestive", label: "Digestive" },
    { value: "cardiovascular", label: "Cardiovascular" },
    { value: "other", label: "Other" },
  ]

  const severityLevels = [
    { value: "all", label: "All Severity Levels" },
    { value: "low", label: "Low Risk" },
    { value: "medium", label: "Medium Risk" },
    { value: "high", label: "High Risk" },
    { value: "emergency", label: "Emergency" },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "emergency":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />
      case "high":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getMortalityColor = (mortality: string) => {
    switch (mortality) {
      case "Very High":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  useEffect(() => {
    fetchDiseases()
  }, [searchQuery, selectedCategory, selectedSeverity, currentLanguage])

  const fetchDiseases = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        language: currentLanguage,
        ...(searchQuery && { q: searchQuery }),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        ...(selectedSeverity !== "all" && { severity: selectedSeverity }),
      })

      const response = await fetch(`/api/diseases?${params}`)
      const data = await response.json()
      setDiseases(data.diseases || [])
    } catch (error) {
      console.error("Failed to fetch diseases:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTranslatedContent = (disease: DiseaseInfo, field: keyof DiseaseInfo["translations"]["en"]) => {
    if (currentLanguage !== "en" && disease.translations[currentLanguage]) {
      return disease.translations[currentLanguage][field]
    }
    return disease[field as keyof DiseaseInfo]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-slate-200 px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Stethoscope className="w-8 h-8 text-primary" />
            {t("diseaseInformation", "Disease Information")}
          </h1>
          <p className="text-muted-foreground">
            {t("diseaseInformationDesc", "Learn about diseases, symptoms, and prevention")}
          </p>
        </div>

        <Card className="mb-8 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Skull className="w-6 h-6" />
              Current Deadly Diseases - Global Health Threats
              <TrendingUp className="w-5 h-5 text-red-600" />
            </CardTitle>
            <p className="text-red-700 text-sm">Stay informed about the most serious health threats worldwide</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentDeadlyDiseases.map((disease, index) => (
                <Card key={index} className="border-l-4 border-l-red-500 bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-red-800">{disease.name}</CardTitle>
                      <Badge className={getMortalityColor(disease.mortality)}>{disease.mortality} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{disease.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 mb-1">TRANSMISSION:</p>
                        <Badge variant="outline" className="text-xs">
                          {disease.spread}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-green-700 mb-2">PREVENTION MEASURES:</p>
                        <ul className="space-y-1">
                          {disease.prevention.map((measure, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                              {measure}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search diseases, symptoms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Disease Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diseases.map((disease) => (
              <Card key={disease.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{getTranslatedContent(disease, "name") as string}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(disease.severity)}
                      <Badge className={getSeverityColor(disease.severity)}>{disease.severity}</Badge>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {disease.category}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      Symptoms
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {(getTranslatedContent(disease, "symptoms") as string[]).slice(0, 3).map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                          {symptom}
                        </li>
                      ))}
                      {(getTranslatedContent(disease, "symptoms") as string[]).length > 3 && (
                        <li className="text-xs text-primary">
                          +{(getTranslatedContent(disease, "symptoms") as string[]).length - 3} more symptoms
                        </li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                      <Heart className="w-4 h-4 text-green-500" />
                      Prevention
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {(getTranslatedContent(disease, "prevention") as string[])
                        .slice(0, 2)
                        .map((prevention, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                            {prevention}
                          </li>
                        ))}
                    </ul>
                  </div>

                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && diseases.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No diseases found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
