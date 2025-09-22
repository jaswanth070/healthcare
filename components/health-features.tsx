"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Phone, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HealthFeatures() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Calendar className="w-5 h-5" />,
      title: t("vaccinationSchedule"),
      description: t("vaccinationScheduleDesc"),
      action: t("viewSchedule"),
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: t("diseaseInformation"),
      description: t("diseaseInformationDesc"),
      action: t("browseDiseases"),
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: t("emergencyContacts"),
      description: t("emergencyContactsDesc"),
      action: t("viewContacts"),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t("communityHealth"),
      description: t("communityHealthDesc"),
      action: t("viewPrograms"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("healthResources")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="text-primary mt-1">{feature.icon}</div>
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-sm">{feature.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                {feature.action}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
