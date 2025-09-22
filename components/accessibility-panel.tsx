"use client"

import { useState } from "react"
import { useAccessibility } from "@/lib/accessibility-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  X,
  Type,
  Volume2,
  Mic,
  Palette,
  Keyboard,
  RotateCcw,
  Settings,
  Zap,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings, speak, isAccessibilityPanelOpen, setAccessibilityPanelOpen } =
    useAccessibility()

  const [showAdvanced, setShowAdvanced] = useState(false)

  if (!isAccessibilityPanelOpen) return null

  const fontSizeOptions = [
    { value: "small", label: "Small", size: "text-sm" },
    { value: "medium", label: "Medium", size: "text-base" },
    { value: "large", label: "Large", size: "text-lg" },
    { value: "extra-large", label: "Extra Large", size: "text-xl" },
  ] as const

  const colorBlindOptions = [
    { value: "none", label: "None" },
    { value: "protanopia", label: "Protanopia (Red-blind)" },
    { value: "deuteranopia", label: "Deuteranopia (Green-blind)" },
    { value: "tritanopia", label: "Tritanopia (Blue-blind)" },
  ] as const

  const handleSpeak = (text: string) => {
    speak(text)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Accessibility Settings
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Customize your experience for better accessibility</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setAccessibilityPanelOpen(false)} className="h-8 w-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Basic Settings - Always Visible */}
          <div className="space-y-6">
            {/* Font Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Font Size
                </label>
                <Button variant="ghost" size="sm" onClick={() => handleSpeak("Font size setting")}>
                  <Volume2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {fontSizeOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={settings.fontSize === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting("fontSize", option.value)}
                    className={option.size}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  High Contrast Mode
                </label>
                <p className="text-xs text-muted-foreground">Increases contrast for better visibility</p>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting("highContrast", checked)}
              />
            </div>

            <Separator />

            {/* Screen Reader */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  Screen Reader
                </label>
                <p className="text-xs text-muted-foreground">Enables text-to-speech functionality</p>
              </div>
              <Switch
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSetting("screenReader", checked)}
              />
            </div>

            {settings.screenReader && (
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <p className="text-sm font-medium">Test Screen Reader</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleSpeak("Welcome to Arogya Health Bot. Your AI healthcare assistant.")}
                  >
                    Test Voice
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => window.speechSynthesis?.cancel()}>
                    Stop
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings Toggle */}
          <div className="pt-4 border-t">
            <Button variant="ghost" onClick={() => setShowAdvanced(!showAdvanced)} className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Advanced Settings
              </span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {/* Advanced Settings - Hidden by Default */}
          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t">
              {/* Color Blind Support */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color Blind Support
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {colorBlindOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={settings.colorBlindMode === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateSetting("colorBlindMode", option.value)}
                      className="justify-start"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Reduce Motion
                  </label>
                  <p className="text-xs text-muted-foreground">Minimizes animations and transitions</p>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => updateSetting("reducedMotion", checked)}
                />
              </div>

              <Separator />

              {/* Voice Navigation */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mic className="w-4 h-4" />
                    Voice Navigation
                  </label>
                  <p className="text-xs text-muted-foreground">Navigate using voice commands</p>
                </div>
                <Switch
                  checked={settings.voiceNavigation}
                  onCheckedChange={(checked) => updateSetting("voiceNavigation", checked)}
                />
              </div>

              {settings.voiceNavigation && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Voice Commands</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• "Go home" - Navigate to homepage</p>
                    <p>• "Check symptoms" - Open symptom checker</p>
                    <p>• "Find hospitals" - Open hospital finder</p>
                    <p>• "Ask doctor" - Open chat</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Keyboard className="w-4 h-4" />
                    Enhanced Keyboard Navigation
                  </label>
                  <p className="text-xs text-muted-foreground">Improved focus indicators and keyboard shortcuts</p>
                </div>
                <Switch
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => updateSetting("keyboardNavigation", checked)}
                />
              </div>

              {settings.keyboardNavigation && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Keyboard Shortcuts</p>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>Navigate:</span>
                      <Badge variant="secondary">Tab / Shift+Tab</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Activate:</span>
                      <Badge variant="secondary">Enter / Space</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Go Home:</span>
                      <Badge variant="secondary">Alt+H</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Accessibility:</span>
                      <Badge variant="secondary">Alt+A</Badge>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={resetSettings} className="flex-1 bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
            <Button onClick={() => setAccessibilityPanelOpen(false)} className="flex-1">
              Apply Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
