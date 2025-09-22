"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Shield, AlertTriangle, CheckCircle, Syringe, Plus, MapPin, FileText, Home } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import type { VaccinationRecord, UserVaccinationRecord } from "@/lib/vaccination-database"
import { getImportanceIcon, getImportanceColor } from "@/lib/utils"
import Link from "next/link"

export default function VaccinationPage() {
  const { currentLanguage, t } = useLanguage()
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([])
  const [userRecords, setUserRecords] = useState<UserVaccinationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all")
  const [selectedVaccine, setSelectedVaccine] = useState<VaccinationRecord | null>(null)
  const [isAddingRecord, setIsAddingRecord] = useState(false)

  const [newRecord, setNewRecord] = useState({
    dateGiven: "",
    doseNumber: 1,
    location: "",
    batchNumber: "",
    notes: "",
  })

  const getTranslatedContent = (vaccine: VaccinationRecord, field: keyof VaccinationRecord["translations"]["en"]) => {
    if (currentLanguage !== "en" && vaccine.translations[currentLanguage]) {
      return vaccine.translations[currentLanguage][field]
    }
    return vaccine[field as keyof VaccinationRecord]
  }

  useEffect(() => {
    fetchVaccinations()
  }, [selectedAgeGroup, currentLanguage])

  const fetchVaccinations = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        language: currentLanguage,
        ...(selectedAgeGroup !== "all" && { ageGroup: selectedAgeGroup }),
      })

      const response = await fetch(`/api/vaccination-schedule?${params}`)
      const data = await response.json()

      if (data.schedule) {
        const allVaccinations = Object.values(data.schedule).flat() as VaccinationRecord[]
        setVaccinations(allVaccinations)
      }
    } catch (error) {
      console.error("Failed to fetch vaccination schedule:", error)
    } finally {
      setLoading(false)
    }
  }

  const ageGroups = [
    { value: "all", label: "All Age Groups", icon: <Shield className="w-4 h-4" /> },
    { value: "infant", label: "Infants (0-2 years)", icon: <Syringe className="w-4 h-4" /> },
    { value: "child", label: "Children (2-12 years)", icon: <Syringe className="w-4 h-4" /> },
    { value: "adolescent", label: "Adolescents (12-18 years)", icon: <Syringe className="w-4 h-4" /> },
    { value: "adult", label: "Adults (18-65 years)", icon: <Syringe className="w-4 h-4" /> },
    { value: "elderly", label: "Elderly (65+ years)", icon: <Syringe className="w-4 h-4" /> },
  ]

  const handleAddRecord = async () => {
    if (!selectedVaccine || !newRecord.dateGiven) return

    const record: UserVaccinationRecord = {
      id: Date.now().toString(),
      userId: "user-1",
      vaccineId: selectedVaccine.id,
      dateGiven: new Date(newRecord.dateGiven),
      doseNumber: newRecord.doseNumber,
      location: newRecord.location,
      batchNumber: newRecord.batchNumber,
      notes: newRecord.notes,
    }

    setUserRecords((prev) => [...prev, record])
    setNewRecord({
      dateGiven: "",
      doseNumber: 1,
      location: "",
      batchNumber: "",
      notes: "",
    })
    setIsAddingRecord(false)
    setSelectedVaccine(null)
  }

  const isVaccineCompleted = (vaccine: VaccinationRecord) => {
    const records = userRecords.filter((r) => r.vaccineId === vaccine.id)
    return records.length >= vaccine.doses
  }

  const getNextDueDate = (vaccine: VaccinationRecord) => {
    const records = userRecords.filter((r) => r.vaccineId === vaccine.id)
    if (records.length === 0) return "Not started"
    if (records.length >= vaccine.doses && !vaccine.boosterRequired) return "Complete"

    const lastRecord = records.sort((a, b) => b.dateGiven.getTime() - a.dateGiven.getTime())[0]
    const nextDate = new Date(lastRecord.dateGiven)

    if (records.length < vaccine.doses && vaccine.interval) {
      const intervalWeeks = Number.parseInt(vaccine.interval.match(/(\d+)\s*weeks?/)?.[1] || "4")
      nextDate.setDate(nextDate.getDate() + intervalWeeks * 7)
      return nextDate.toLocaleDateString()
    }

    return "Check with doctor"
  }

  const VaccinationCard = ({ vaccine }: { vaccine: VaccinationRecord }) => {
    const completed = isVaccineCompleted(vaccine)
    const nextDue = getNextDueDate(vaccine)
    const userVaccineRecords = userRecords.filter((r) => r.vaccineId === vaccine.id)

    return (
      <Card className={`hover:shadow-lg transition-shadow ${completed ? "border-green-200 bg-green-50/30" : ""}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Syringe className={`w-5 h-5 ${completed ? "text-green-600" : "text-primary"}`} />
              {getTranslatedContent(vaccine, "vaccine") as string}
              {completed && <CheckCircle className="w-4 h-4 text-green-600" />}
            </CardTitle>
            <div className="flex items-center gap-2">
              {getImportanceIcon(vaccine.importance)}
              <Badge className={getImportanceColor(vaccine.importance)}>{vaccine.importance}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {vaccine.scheduledAge}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${completed ? "text-green-600" : "text-orange-600"}`}>
              Status: {completed ? "Complete" : `${userVaccineRecords.length}/${vaccine.doses} doses`}
            </span>
            <span className="text-muted-foreground">Next due: {nextDue}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-sm font-medium text-foreground mb-1">About this vaccine:</p>
            <p className="text-sm text-muted-foreground">{getTranslatedContent(vaccine, "description") as string}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-background border rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Doses:</span>
              <span className="text-muted-foreground">{vaccine.doses}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Booster:</span>
              <span className="text-muted-foreground">{vaccine.boosterRequired ? "Yes" : "No"}</span>
            </div>
            {vaccine.interval && (
              <div className="col-span-2 flex items-center gap-2">
                <span className="font-semibold text-foreground">Interval:</span>
                <span className="text-muted-foreground">{vaccine.interval}</span>
              </div>
            )}
          </div>

          {userVaccineRecords.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-2 text-green-800 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Your Vaccination History
              </h4>
              <div className="space-y-2">
                {userVaccineRecords.map((record, index) => (
                  <div key={record.id} className="text-sm bg-white rounded p-2 border border-green-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-green-700">Dose {record.doseNumber}</span>
                        <span className="text-muted-foreground ml-2">{record.dateGiven.toLocaleDateString()}</span>
                      </div>
                      {record.location && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {record.location}
                        </span>
                      )}
                    </div>
                    {record.notes && <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-2 text-orange-800 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Possible Side Effects
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {(getTranslatedContent(vaccine, "sideEffects") as string[]).slice(0, 3).map((effect, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                  {effect}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-2">
            {!completed && (
              <Dialog
                open={isAddingRecord && selectedVaccine?.id === vaccine.id}
                onOpenChange={(open) => {
                  setIsAddingRecord(open)
                  if (open) setSelectedVaccine(vaccine)
                  else setSelectedVaccine(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="flex-1">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Vaccination Record</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="vaccine-name">Vaccine</Label>
                      <Input id="vaccine-name" value={vaccine.vaccine} disabled className="bg-muted" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date-given">Date Given *</Label>
                        <Input
                          id="date-given"
                          type="date"
                          value={newRecord.dateGiven}
                          onChange={(e) => setNewRecord((prev) => ({ ...prev, dateGiven: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="dose-number">Dose Number</Label>
                        <Input
                          id="dose-number"
                          type="number"
                          min="1"
                          max={vaccine.doses}
                          value={newRecord.doseNumber}
                          onChange={(e) =>
                            setNewRecord((prev) => ({ ...prev, doseNumber: Number.parseInt(e.target.value) }))
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Hospital/Clinic name"
                        value={newRecord.location}
                        onChange={(e) => setNewRecord((prev) => ({ ...prev, location: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="batch-number">Batch Number (Optional)</Label>
                      <Input
                        id="batch-number"
                        placeholder="Vaccine batch number"
                        value={newRecord.batchNumber}
                        onChange={(e) => setNewRecord((prev) => ({ ...prev, batchNumber: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any additional notes..."
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord((prev) => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingRecord(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleAddRecord} disabled={!newRecord.dateGiven} className="flex-1">
                        Add Record
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Calendar className="w-4 h-4 mr-1" />
              Set Reminder
            </Button>
          </div>
        </CardContent>
      </Card>
    )
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
            <Calendar className="w-8 h-8 text-primary" />
            {t("vaccinationSchedule")}
          </h1>
          <p className="text-muted-foreground">{t("vaccinationScheduleDesc")}</p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Shield className="w-5 h-5" />
              Your Vaccination Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {Math.round((userRecords.length / vaccinations.length) * 100) || 0}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
                <Progress value={Math.round((userRecords.length / vaccinations.length) * 100) || 0} className="mt-2" />
              </div>
              <div className="text-center bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-blue-600 mb-1">{userRecords.length}</div>
                <div className="text-sm text-muted-foreground">Vaccines Completed</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {vaccinations.filter((v) => v.importance === "essential" && !isVaccineCompleted(v)).length}
                </div>
                <div className="text-sm text-muted-foreground">Essential Due</div>
              </div>
              <div className="text-center bg-white rounded-lg p-4 border">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {vaccinations.filter((v) => v.boosterRequired).length}
                </div>
                <div className="text-sm text-muted-foreground">Need Boosters</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Group Tabs */}
        <Tabs value={selectedAgeGroup} onValueChange={setSelectedAgeGroup} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {ageGroups.map((group) => (
              <TabsTrigger key={group.value} value={group.value} className="flex items-center gap-1 text-xs">
                {group.icon}
                <span className="hidden sm:inline">{group.label.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {ageGroups.map((group) => (
            <TabsContent key={group.value} value={group.value}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  {group.icon}
                  {group.label}
                </h2>
              </div>

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
                  {vaccinations
                    .filter((vaccine) => selectedAgeGroup === "all" || vaccine.ageGroup === selectedAgeGroup)
                    .map((vaccine) => (
                      <VaccinationCard key={vaccine.id} vaccine={vaccine} />
                    ))}
                </div>
              )}

              {!loading &&
                vaccinations.filter((vaccine) => selectedAgeGroup === "all" || vaccine.ageGroup === selectedAgeGroup)
                  .length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <Syringe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No vaccinations found</h3>
                      <p className="text-muted-foreground">No vaccination records available for this age group.</p>
                    </CardContent>
                  </Card>
                )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <AlertTriangle className="w-4 h-4" />
                View Due Vaccines
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <FileText className="w-4 h-4" />
                Download Records
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
