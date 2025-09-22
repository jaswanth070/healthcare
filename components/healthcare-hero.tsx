"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function HealthcareHero() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Heart className="w-4 h-4 mr-2" />
            {t("aiPoweredHealthcare")}
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6 text-foreground">{t("heroTitle")}</h1>

          <p className="text-lg lg:text-xl text-muted-foreground text-pretty mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-3">
              {t("startHealthChat")}
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              {t("viewVaccinationSchedule")}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>15+ {t("languages")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>{t("governmentVerified")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>{t("available24x7")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
  )
}
