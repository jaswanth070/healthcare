"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  MapPin,
  Search,
  Navigation,
  Phone,
  Clock,
  Star,
  Bed,
  Stethoscope,
  Car,
  Ambulance,
  Heart,
  Shield,
  Users,
  Award,
} from "lucide-react"
import Link from "next/link"

interface Hospital {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  reviews: number
  phone: string
  type: "government" | "private" | "specialty"
  specialties: string[]
  beds: number
  emergency: boolean
  ambulance: boolean
  openHours: string
  image?: string
}

export default function HospitalsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const mockHospitals: Hospital[] = [
    {
      id: "1",
      name: "City General Hospital",
      address: "123 Main Street, Downtown",
      distance: "0.8 km",
      rating: 4.5,
      reviews: 1250,
      phone: "+1-555-0123",
      type: "government",
      specialties: ["Emergency", "Cardiology", "Orthopedics", "Pediatrics"],
      beds: 350,
      emergency: true,
      ambulance: true,
      openHours: "24/7",
    },
    {
      id: "2",
      name: "St. Mary's Medical Center",
      address: "456 Oak Avenue, Midtown",
      distance: "1.2 km",
      rating: 4.8,
      reviews: 890,
      phone: "+1-555-0456",
      type: "private",
      specialties: ["Oncology", "Neurology", "Surgery", "ICU"],
      beds: 280,
      emergency: true,
      ambulance: true,
      openHours: "24/7",
    },
    {
      id: "3",
      name: "Children's Specialty Hospital",
      address: "789 Pine Road, Westside",
      distance: "2.1 km",
      rating: 4.7,
      reviews: 650,
      phone: "+1-555-0789",
      type: "specialty",
      specialties: ["Pediatrics", "Neonatology", "Child Surgery"],
      beds: 120,
      emergency: true,
      ambulance: false,
      openHours: "6:00 AM - 10:00 PM",
    },
    {
      id: "4",
      name: "Metro Community Hospital",
      address: "321 Elm Street, Eastside",
      distance: "2.8 km",
      rating: 4.2,
      reviews: 420,
      phone: "+1-555-0321",
      type: "government",
      specialties: ["General Medicine", "Maternity", "Pharmacy"],
      beds: 180,
      emergency: false,
      ambulance: true,
      openHours: "6:00 AM - 8:00 PM",
    },
    {
      id: "5",
      name: "Advanced Heart Institute",
      address: "654 Cedar Lane, Northside",
      distance: "3.5 km",
      rating: 4.9,
      reviews: 320,
      phone: "+1-555-0654",
      type: "specialty",
      specialties: ["Cardiology", "Cardiac Surgery", "Interventional Cardiology"],
      beds: 80,
      emergency: true,
      ambulance: true,
      openHours: "24/7",
    },
  ]

  const getLocationAndSearch = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocation("Current Location")
          setHospitals(mockHospitals)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocation("Location access denied")
          setHospitals(mockHospitals)
          setIsLoading(false)
        },
      )
    } else {
      setLocation("Geolocation not supported")
      setHospitals(mockHospitals)
      setIsLoading(false)
    }
  }

  const searchHospitals = () => {
    setIsLoading(true)
    setTimeout(() => {
      const filtered = mockHospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setHospitals(filtered)
      setIsLoading(false)
    }, 1000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-green-100 text-green-800 border-green-200"
      case "private":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "specialty":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "government":
        return <Shield className="w-3 h-3" />
      case "private":
        return <Heart className="w-3 h-3" />
      case "specialty":
        return <Award className="w-3 h-3" />
      default:
        return <Stethoscope className="w-3 h-3" />
    }
  }

  useEffect(() => {
    getLocationAndSearch()
  }, [])

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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{t("hospitalsNearMe", "Hospitals Near Me")}</h1>
              <p className="text-slate-600">
                {t("findNearbyHospitals", "Find nearby hospitals and medical facilities")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Search and Location Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search by name or specialty</label>
                  <Input
                    placeholder="e.g., Cardiology, Emergency, Hospital name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchHospitals()}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter location or use current"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={getLocationAndSearch} variant="outline">
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={searchHospitals} disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? "Searching..." : "Search Hospitals"}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("Emergency")
                    searchHospitals()
                  }}
                >
                  <Ambulance className="w-4 h-4 mr-1" />
                  Emergency
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("Cardiology")
                    searchHospitals()
                  }}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Cardiology
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("Pediatrics")
                    searchHospitals()
                  }}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Pediatrics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("Surgery")
                    searchHospitals()
                  }}
                >
                  <Stethoscope className="w-4 h-4 mr-1" />
                  Surgery
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {isLoading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="animate-spin w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">Finding hospitals near you...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">{hospitals.length} hospitals found</h2>
                <div className="text-sm text-slate-600">Sorted by distance</div>
              </div>

              {hospitals.map((hospital) => (
                <Card key={hospital.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Hospital Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-1">{hospital.name}</h3>
                            <p className="text-slate-600 flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {hospital.address}
                            </p>
                          </div>
                          <Badge className={getTypeColor(hospital.type)}>
                            {getTypeIcon(hospital.type)}
                            <span className="ml-1 capitalize">{hospital.type}</span>
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{hospital.rating}</span>
                            <span className="text-slate-500">({hospital.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <Car className="w-4 h-4" />
                            {hospital.distance}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <Bed className="w-4 h-4" />
                            {hospital.beds} beds
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-slate-700">Specialties:</p>
                          <div className="flex flex-wrap gap-2">
                            {hospital.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {hospital.openHours}
                          </div>
                          {hospital.emergency && (
                            <Badge variant="destructive" className="text-xs">
                              <Ambulance className="w-3 h-3 mr-1" />
                              Emergency
                            </Badge>
                          )}
                          {hospital.ambulance && (
                            <Badge variant="outline" className="text-xs">
                              <Car className="w-3 h-3 mr-1" />
                              Ambulance
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <Button className="w-full" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Hospital
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          <Navigation className="w-4 h-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" className="w-full bg-transparent" size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <div className="text-xs text-slate-500 text-center pt-2">Phone: {hospital.phone}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Emergency Notice */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Ambulance className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Emergency Services</h3>
                  <p className="text-sm text-red-700 mb-2">
                    In case of a medical emergency, call your local emergency number immediately or visit the nearest
                    emergency room.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive">
                      Call Emergency: 911
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                    >
                      Find Emergency Room
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
