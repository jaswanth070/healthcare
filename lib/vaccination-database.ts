export interface VaccinationRecord {
  id: string
  vaccine: string
  ageGroup: "infant" | "child" | "adolescent" | "adult" | "elderly"
  scheduledAge: string
  description: string
  doses: number
  interval?: string
  boosterRequired: boolean
  boosterInterval?: string
  sideEffects: string[]
  contraindications: string[]
  importance: "essential" | "recommended" | "optional"
  translations: {
    [key: string]: {
      vaccine: string
      description: string
      sideEffects: string[]
      contraindications: string[]
    }
  }
}

export const vaccinationSchedule: VaccinationRecord[] = [
  {
    id: "bcg",
    vaccine: "BCG",
    ageGroup: "infant",
    scheduledAge: "At birth",
    description: "Protects against tuberculosis (TB)",
    doses: 1,
    boosterRequired: false,
    sideEffects: ["Small sore at injection site", "Mild fever", "Swollen lymph nodes"],
    contraindications: ["Immunocompromised children", "Active TB", "Severe illness"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "बीसीजी",
        description: "तपेदिक (टीबी) से सुरक्षा प्रदान करता है",
        sideEffects: ["इंजेक्शन स्थल पर छोटा घाव", "हल्का बुखार", "सूजी हुई लसीका ग्रंथियां"],
        contraindications: ["प्रतिरक्षा कमजोर बच्चे", "सक्रिय टीबी", "गंभीर बीमारी"],
      },
    },
  },
  {
    id: "hepatitis-b",
    vaccine: "Hepatitis B",
    ageGroup: "infant",
    scheduledAge: "At birth, 6 weeks, 14 weeks",
    description: "Prevents Hepatitis B infection",
    doses: 3,
    interval: "0, 6, 14 weeks",
    boosterRequired: false,
    sideEffects: ["Pain at injection site", "Mild fever", "Fatigue"],
    contraindications: ["Severe allergic reaction to previous dose", "Severe illness"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "हेपेटाइटिस बी",
        description: "हेपेटाइटिस बी संक्रमण से बचाव करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "हल्का बुखार", "थकान"],
        contraindications: ["पिछली खुराक से गंभीर एलर्जी", "गंभीर बीमारी"],
      },
    },
  },
  {
    id: "dpt",
    vaccine: "DPT (Diphtheria, Pertussis, Tetanus)",
    ageGroup: "infant",
    scheduledAge: "6, 10, 14 weeks",
    description: "Protects against diphtheria, whooping cough, and tetanus",
    doses: 3,
    interval: "4 weeks apart",
    boosterRequired: true,
    boosterInterval: "16-24 months, then every 10 years",
    sideEffects: ["Redness at injection site", "Mild fever", "Fussiness", "Loss of appetite"],
    contraindications: ["Severe allergic reaction", "Brain disorder", "Severe illness"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "डीपीटी (डिप्थीरिया, पर्टुसिस, टेटनस)",
        description: "डिप्थीरिया, काली खांसी और टेटनस से सुरक्षा प्रदान करता है",
        sideEffects: ["इंजेक्शन स्थल पर लालिमा", "हल्का बुखार", "चिड़चिड़ाहट", "भूख न लगना"],
        contraindications: ["गंभीर एलर्जी", "मस्तिष्क विकार", "गंभीर बीमारी"],
      },
    },
  },
  {
    id: "polio",
    vaccine: "Polio (OPV/IPV)",
    ageGroup: "infant",
    scheduledAge: "6, 10, 14 weeks",
    description: "Prevents poliomyelitis (polio)",
    doses: 3,
    interval: "4 weeks apart",
    boosterRequired: true,
    boosterInterval: "16-24 months",
    sideEffects: ["Mild fever", "Fussiness", "Rarely: allergic reaction"],
    contraindications: ["Immunocompromised individuals", "Severe illness", "Allergy to vaccine components"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "पोलियो (ओपीवी/आईपीवी)",
        description: "पोलियोमाइलाइटिस (पोलियो) से बचाव करता है",
        sideEffects: ["हल्का बुखार", "चिड़चिड़ाहट", "शायद ही कभी: एलर्जी"],
        contraindications: ["प्रतिरक्षा कमजोर व्यक्ति", "गंभीर बीमारी", "वैक्सीन घटकों से एलर्जी"],
      },
    },
  },
  {
    id: "mmr",
    vaccine: "MMR (Measles, Mumps, Rubella)",
    ageGroup: "child",
    scheduledAge: "9-12 months",
    description: "Protects against measles, mumps, and rubella",
    doses: 2,
    interval: "First dose at 9-12 months, second at 16-24 months",
    boosterRequired: false,
    sideEffects: ["Mild fever", "Rash", "Swollen glands", "Joint pain"],
    contraindications: ["Pregnancy", "Immunocompromised", "Severe illness", "Allergy to gelatin/neomycin"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "एमएमआर (खसरा, कण्ठमाला, रूबेला)",
        description: "खसरा, कण्ठमाला और रूबेला से सुरक्षा प्रदान करता है",
        sideEffects: ["हल्का बुखार", "दाने", "सूजी हुई ग्रंथियां", "जोड़ों में दर्द"],
        contraindications: ["गर्भावस्था", "प्रतिरक्षा कमजोर", "गंभीर बीमारी", "जिलेटिन/नियोमाइसिन से एलर्जी"],
      },
    },
  },
  {
    id: "typhoid",
    vaccine: "Typhoid",
    ageGroup: "child",
    scheduledAge: "2 years and above",
    description: "Prevents typhoid fever",
    doses: 1,
    boosterRequired: true,
    boosterInterval: "Every 3 years",
    sideEffects: ["Pain at injection site", "Mild fever", "Headache"],
    contraindications: ["Severe illness", "Immunocompromised", "Age under 2 years"],
    importance: "recommended",
    translations: {
      hi: {
        vaccine: "टाइफाइड",
        description: "टाइफाइड बुखार से बचाव करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "हल्का बुखार", "सिरदर्द"],
        contraindications: ["गंभीर बीमारी", "प्रतिरक्षा कमजोर", "2 साल से कम उम्र"],
      },
    },
  },
  {
    id: "hpv",
    vaccine: "HPV (Human Papillomavirus)",
    ageGroup: "adolescent",
    scheduledAge: "9-14 years (girls and boys)",
    description: "Prevents cervical cancer and other HPV-related cancers",
    doses: 2,
    interval: "6-12 months apart",
    boosterRequired: false,
    sideEffects: ["Pain at injection site", "Mild fever", "Headache", "Dizziness"],
    contraindications: ["Pregnancy", "Severe illness", "Allergy to vaccine components"],
    importance: "recommended",
    translations: {
      hi: {
        vaccine: "एचपीवी (ह्यूमन पैपिलोमावायरस)",
        description: "गर्भाशय ग्रीवा के कैंसर और अन्य एचपीवी संबंधी कैंसर से बचाव करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "हल्का बुखार", "सिरदर्द", "चक्कर आना"],
        contraindications: ["गर्भावस्था", "गंभीर बीमारी", "वैक्सीन घटकों से एलर्जी"],
      },
    },
  },
  {
    id: "influenza",
    vaccine: "Influenza (Flu)",
    ageGroup: "adult",
    scheduledAge: "Annual (6 months and older)",
    description: "Protects against seasonal influenza",
    doses: 1,
    interval: "Annual",
    boosterRequired: true,
    boosterInterval: "Every year",
    sideEffects: ["Soreness at injection site", "Low-grade fever", "Aches"],
    contraindications: ["Severe egg allergy", "Previous severe reaction", "Severe illness"],
    importance: "recommended",
    translations: {
      hi: {
        vaccine: "इन्फ्लूएंजा (फ्लू)",
        description: "मौसमी इन्फ्लूएंजा से सुरक्षा प्रदान करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "हल्का बुखार", "दर्द"],
        contraindications: ["गंभीर अंडे की एलर्जी", "पिछली गंभीर प्रतिक्रिया", "गंभीर बीमारी"],
      },
    },
  },
  {
    id: "covid-19",
    vaccine: "COVID-19",
    ageGroup: "adult",
    scheduledAge: "12 years and older",
    description: "Protects against COVID-19 infection",
    doses: 2,
    interval: "3-8 weeks apart (depending on vaccine type)",
    boosterRequired: true,
    boosterInterval: "6 months after primary series",
    sideEffects: ["Pain at injection site", "Fatigue", "Headache", "Muscle pain", "Fever"],
    contraindications: ["Severe allergic reaction to previous dose", "Severe illness"],
    importance: "essential",
    translations: {
      hi: {
        vaccine: "कोविड-19",
        description: "कोविड-19 संक्रमण से सुरक्षा प्रदान करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "थकान", "सिरदर्द", "मांसपेशियों में दर्द", "बुखार"],
        contraindications: ["पिछली खुराक से गंभीर एलर्जी", "गंभीर बीमारी"],
      },
    },
  },
  {
    id: "pneumococcal",
    vaccine: "Pneumococcal",
    ageGroup: "elderly",
    scheduledAge: "65 years and older",
    description: "Prevents pneumococcal pneumonia and other infections",
    doses: 1,
    boosterRequired: false,
    sideEffects: ["Pain at injection site", "Mild fever", "Muscle aches"],
    contraindications: ["Severe illness", "Allergy to vaccine components"],
    importance: "recommended",
    translations: {
      hi: {
        vaccine: "न्यूमोकोकल",
        description: "न्यूमोकोकल निमोनिया और अन्य संक्रमणों से बचाव करता है",
        sideEffects: ["इंजेक्शन स्थल पर दर्द", "हल्का बुखार", "मांसपेशियों में दर्द"],
        contraindications: ["गंभीर बीमारी", "वैक्सीन घटकों से एलर्जी"],
      },
    },
  },
]

export interface UserVaccinationRecord {
  id: string
  userId: string
  vaccineId: string
  dateGiven: Date
  doseNumber: number
  nextDueDate?: Date
  location: string
  batchNumber?: string
  notes?: string
}

export function getVaccinationsByAgeGroup(ageGroup: VaccinationRecord["ageGroup"]): VaccinationRecord[] {
  return vaccinationSchedule.filter((vaccine) => vaccine.ageGroup === ageGroup)
}

export function getVaccinationById(id: string): VaccinationRecord | undefined {
  return vaccinationSchedule.find((vaccine) => vaccine.id === id)
}

export function getEssentialVaccinations(): VaccinationRecord[] {
  return vaccinationSchedule.filter((vaccine) => vaccine.importance === "essential")
}

export function getVaccinationsRequiringBooster(): VaccinationRecord[] {
  return vaccinationSchedule.filter((vaccine) => vaccine.boosterRequired)
}

export function calculateNextDueDate(vaccine: VaccinationRecord, lastDoseDate: Date, doseNumber: number): Date | null {
  if (!vaccine.boosterRequired && doseNumber >= vaccine.doses) {
    return null // No more doses needed
  }

  const nextDate = new Date(lastDoseDate)

  if (doseNumber < vaccine.doses && vaccine.interval) {
    // Calculate next dose in primary series
    const intervalWeeks = Number.parseInt(vaccine.interval.match(/(\d+)\s*weeks?/)?.[1] || "4")
    nextDate.setDate(nextDate.getDate() + intervalWeeks * 7)
  } else if (vaccine.boosterRequired && vaccine.boosterInterval) {
    // Calculate booster dose
    if (vaccine.boosterInterval.includes("year")) {
      const years = Number.parseInt(vaccine.boosterInterval.match(/(\d+)\s*years?/)?.[1] || "1")
      nextDate.setFullYear(nextDate.getFullYear() + years)
    } else if (vaccine.boosterInterval.includes("month")) {
      const months = Number.parseInt(vaccine.boosterInterval.match(/(\d+)\s*months?/)?.[1] || "6")
      nextDate.setMonth(nextDate.getMonth() + months)
    }
  }

  return nextDate
}
