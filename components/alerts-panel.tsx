"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info, CheckCircle, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function AlertsPanel() {
  const { t } = useLanguage()

  const alerts = [
    {
      id: "1",
      type: "warning" as const,
      title: "Dengue Alert",
      message: "Increased dengue cases reported in your area. Take preventive measures.",
      location: "Your District",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "info" as const,
      title: "Vaccination Drive",
      message: "Free COVID-19 booster shots available at nearby health center.",
      location: "Community Health Center",
      timestamp: "1 day ago",
    },
    {
      id: "3",
      type: "success" as const,
      title: "Health Campaign",
      message: "Successful completion of polio vaccination drive in your area.",
      location: "Your District",
      timestamp: "3 days ago",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4" />
      case "info":
        return <Info className="w-4 h-4" />
      case "success":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getAlertVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "destructive" as const
      case "info":
        return "default" as const
      case "success":
        return "default" as const
      default:
        return "default" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          {t("healthAlerts")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={getAlertVariant(alert.type)}>
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{alert.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {alert.timestamp}
                  </Badge>
                </div>
                <AlertDescription className="text-sm">{alert.message}</AlertDescription>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {alert.location}
                </div>
              </div>
            </div>
          </Alert>
        ))}

        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">{t("alertsUpdated")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
