"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Home, Stethoscope, Search, AlertTriangle, Shield, Heart, CheckCircle, X, Plus } from "lucide-react"
import Link from "next/link"

interface SymptomAnalysis {
  possibleConditions: Array<{
    name: string
    probability: string
    severity: "low" | "medium" | "high" | "emergency"
    description: string
  }>
  preventiveMeasures: string[]
  recommendations: string[]
  urgencyLevel: "low" | "medium" | "high" | "emergency"
}

export default function SymptomsPage() {
  const { t } = useLanguage()
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [currentSymptom, setCurrentSymptom] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Sore throat",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Chest pain",
    "Shortness of breath",
    "Dizziness",
    "Muscle aches",
    "Joint pain",
    "Rash",
    "Loss of appetite",
  ]

  const addSymptom = (symptom: string) => {
    if (symptom.trim() && !symptoms.includes(symptom.trim())) {
      setSymptoms([...symptoms, symptom.trim()])
      setCurrentSymptom("")
    }
  }

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter((s) => s !== symptom))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUrgencyMessage = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "Seek immediate medical attention"
      case "high":
        return "Consult a doctor within 24 hours"
      case "medium":
        return "Schedule a doctor's appointment soon"
      case "low":
        return "Monitor symptoms and rest"
      default:
        return "Monitor symptoms"
    }
  }

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return

    setIsAnalyzing(true)

    // Simulate analysis - in a real app, this would call an AI service
    setTimeout(() => {
      const mockAnalysis: SymptomAnalysis = {
        possibleConditions: [
          {
            name: "Common Cold",
            probability: "High (75%)",
            severity: "low",
            description: "Viral infection of the upper respiratory tract",
          },
          {
            name: "Flu (Influenza)",
            probability: "Medium (45%)",
            severity: "medium",
            description: "Viral infection affecting the respiratory system",
          },
          {
            name: "COVID-19",
            probability: "Medium (35%)",
            severity: "high",
            description: "Coronavirus infection with respiratory symptoms",
          },
        ],
        preventiveMeasures: [
          "Get adequate rest (7-9 hours of sleep)",
          "Stay hydrated by drinking plenty of fluids",
          "Wash hands frequently with soap and water",
          "Avoid close contact with sick individuals",
          "Maintain good nutrition with fruits and vegetables",
          "Consider wearing a mask in crowded places",
          "Disinfect frequently touched surfaces",
          "Avoid touching face, nose, and mouth",
        ],
        recommendations: [
          "Monitor your temperature regularly",
          "Rest and avoid strenuous activities",
          "Use a humidifier to ease breathing",
          "Gargle with warm salt water for sore throat",
          "Take over-the-counter pain relievers if needed",
          "Isolate yourself to prevent spreading illness",
        ],
        urgencyLevel: symptoms.some(
          (s) => s.toLowerCase().includes("chest pain") || s.toLowerCase().includes("shortness of breath"),
        )
          ? "high"
          : "medium",
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{t("checkSymptoms", "Check Symptoms")}</h1>
              <p className="text-slate-600">
                {t("symptomDescription", "Enter your symptoms to get health insights and preventive measures")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Symptom Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Enter Your Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a symptom (e.g., fever, headache, cough)"
                  value={currentSymptom}
                  onChange={(e) => setCurrentSymptom(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSymptom(currentSymptom)}
                  className="flex-1"
                />
                <Button onClick={() => addSymptom(currentSymptom)} disabled={!currentSymptom.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Common symptoms (click to add):</p>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map((symptom) => (
                    <Button
                      key={symptom}
                      variant="outline"
                      size="sm"
                      onClick={() => addSymptom(symptom)}
                      disabled={symptoms.includes(symptom)}
                      className="text-xs"
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
              </div>

              {symptoms.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Selected symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => (
                      <Badge key={symptom} variant="secondary" className="flex items-center gap-1">
                        {symptom}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-red-500"
                          onClick={() => removeSymptom(symptom)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">Additional Information (Optional)</label>
                <Textarea
                  placeholder="Describe when symptoms started, severity, any triggers, etc."
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                onClick={analyzeSymptoms}
                disabled={symptoms.length === 0 || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? "Analyzing Symptoms..." : "Analyze Symptoms"}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Urgency Alert */}
              <Card
                className={`border-l-4 ${
                  analysis.urgencyLevel === "emergency"
                    ? "border-l-red-500 bg-red-50"
                    : analysis.urgencyLevel === "high"
                      ? "border-l-orange-500 bg-orange-50"
                      : analysis.urgencyLevel === "medium"
                        ? "border-l-yellow-500 bg-yellow-50"
                        : "border-l-green-500 bg-green-50"
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle
                      className={`w-5 h-5 ${
                        analysis.urgencyLevel === "emergency"
                          ? "text-red-600"
                          : analysis.urgencyLevel === "high"
                            ? "text-orange-600"
                            : analysis.urgencyLevel === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                      }`}
                    />
                    <h3 className="font-semibold text-lg">Urgency Level: {analysis.urgencyLevel.toUpperCase()}</h3>
                  </div>
                  <p className="text-sm font-medium">{getUrgencyMessage(analysis.urgencyLevel)}</p>
                </CardContent>
              </Card>

              {/* Possible Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Possible Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.possibleConditions.map((condition, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{condition.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className={getSeverityColor(condition.severity)}>{condition.severity}</Badge>
                            <Badge variant="outline">{condition.probability}</Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{condition.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preventive Measures */}
              <Card className="border-green-200 bg-green-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Shield className="w-5 h-5" />
                    Preventive Measures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysis.preventiveMeasures.map((measure, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-white rounded-lg border border-green-200"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{measure}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-blue-200 bg-blue-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Heart className="w-5 h-5" />
                    Care Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-sm">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-1">Medical Disclaimer</p>
                      <p>
                        This analysis is for informational purposes only and should not replace professional medical
                        advice. Always consult with a healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
