export interface DiseaseInfo {
  id: string
  name: string
  category: "infectious" | "chronic" | "respiratory" | "digestive" | "cardiovascular" | "other"
  severity: "low" | "medium" | "high" | "emergency"
  symptoms: string[]
  prevention: string[]
  treatment: string[]
  whenToSeekHelp: string[]
  commonIn: string[]
  translations: {
    [key: string]: {
      name: string
      symptoms: string[]
      prevention: string[]
      treatment: string[]
      whenToSeekHelp: string[]
    }
  }
}

export const diseaseDatabase: DiseaseInfo[] = [
  {
    id: "covid-19",
    name: "COVID-19",
    category: "infectious",
    severity: "high",
    symptoms: [
      "Fever or chills",
      "Cough (dry or with phlegm)",
      "Shortness of breath",
      "Fatigue",
      "Body aches",
      "Headache",
      "Loss of taste or smell",
      "Sore throat",
      "Runny nose",
    ],
    prevention: [
      "Get vaccinated and boosted",
      "Wear masks in crowded places",
      "Maintain physical distance",
      "Wash hands frequently",
      "Avoid touching face",
      "Stay home when sick",
      "Improve ventilation indoors",
    ],
    treatment: [
      "Rest and stay hydrated",
      "Take fever reducers if needed",
      "Isolate from others",
      "Monitor oxygen levels",
      "Seek medical care if symptoms worsen",
    ],
    whenToSeekHelp: [
      "Difficulty breathing",
      "Persistent chest pain",
      "Confusion or inability to stay awake",
      "Bluish lips or face",
      "High fever for more than 3 days",
    ],
    commonIn: ["All age groups", "Higher risk in elderly", "People with chronic conditions"],
    translations: {
      hi: {
        name: "कोविड-19",
        symptoms: [
          "बुखार या ठंड लगना",
          "खांसी (सूखी या कफ के साथ)",
          "सांस लेने में कठिनाई",
          "थकान",
          "शरीर में दर्द",
          "सिरदर्द",
          "स्वाद या गंध का चले जाना",
          "गले में खराश",
          "नाक बहना",
        ],
        prevention: [
          "टीकाकरण कराएं और बूस्टर लें",
          "भीड़भाड़ वाली जगहों पर मास्क पहनें",
          "शारीरिक दूरी बनाए रखें",
          "बार-बार हाथ धोएं",
          "चेहरा छूने से बचें",
          "बीमार होने पर घर पर रहें",
          "घर के अंदर हवा का संचार बेहतर करें",
        ],
        treatment: [
          "आराम करें और पानी पिएं",
          "जरूरत पड़ने पर बुखार की दवा लें",
          "दूसरों से अलग रहें",
          "ऑक्सीजन के स्तर पर नजर रखें",
          "लक्षण बिगड़ने पर डॉक्टर से मिलें",
        ],
        whenToSeekHelp: [
          "सांस लेने में कठिनाई",
          "छाती में लगातार दर्द",
          "भ्रम या जागे रहने में असमर्थता",
          "होंठ या चेहरे का नीला पड़ना",
          "3 दिन से अधिक तेज बुखार",
        ],
      },
    },
  },
  {
    id: "dengue",
    name: "Dengue Fever",
    category: "infectious",
    severity: "high",
    symptoms: [
      "High fever (40°C/104°F)",
      "Severe headache",
      "Eye pain (behind eyes)",
      "Muscle and joint pain",
      "Skin rash",
      "Nausea and vomiting",
      "Mild bleeding (nose, gums)",
    ],
    prevention: [
      "Eliminate standing water",
      "Use mosquito nets",
      "Wear long-sleeved clothing",
      "Use mosquito repellent",
      "Keep surroundings clean",
      "Cover water storage containers",
    ],
    treatment: [
      "Rest and drink plenty of fluids",
      "Take paracetamol for fever",
      "Avoid aspirin and ibuprofen",
      "Monitor platelet count",
      "Seek immediate medical care",
    ],
    whenToSeekHelp: [
      "Severe abdominal pain",
      "Persistent vomiting",
      "Rapid breathing",
      "Bleeding gums",
      "Blood in vomit",
      "Extreme fatigue",
    ],
    commonIn: ["Tropical and subtropical areas", "Monsoon season", "Areas with poor sanitation"],
    translations: {
      hi: {
        name: "डेंगू बुखार",
        symptoms: [
          "तेज बुखार (40°C/104°F)",
          "गंभीर सिरदर्द",
          "आंखों में दर्द (आंखों के पीछे)",
          "मांसपेशियों और जोड़ों में दर्द",
          "त्वचा पर चकत्ते",
          "मतली और उल्टी",
          "हल्की रक्तस्राव (नाक, मसूड़े)",
        ],
        prevention: [
          "खड़े पानी को हटाएं",
          "मच्छरदानी का उपयोग करें",
          "लंबी आस्तीन के कपड़े पहनें",
          "मच्छर भगाने वाली दवा का उपयोग करें",
          "आसपास की सफाई रखें",
          "पानी के भंडारण के बर्तनों को ढकें",
        ],
        treatment: [
          "आराम करें और खूब तरल पदार्थ पिएं",
          "बुखार के लिए पैरासिटामोल लें",
          "एस्पिरिन और इबुप्रोफेन से बचें",
          "प्लेटलेट काउंट पर नजर रखें",
          "तुरंत चिकित्सा सहायता लें",
        ],
        whenToSeekHelp: ["पेट में गंभीर दर्द", "लगातार उल्टी", "तेज सांस लेना", "मसूड़ों से खून आना", "उल्टी में खून", "अत्यधिक थकान"],
      },
    },
  },
  {
    id: "diabetes",
    name: "Diabetes",
    category: "chronic",
    severity: "medium",
    symptoms: [
      "Frequent urination",
      "Excessive thirst",
      "Unexplained weight loss",
      "Extreme fatigue",
      "Blurred vision",
      "Slow-healing wounds",
      "Frequent infections",
    ],
    prevention: [
      "Maintain healthy weight",
      "Exercise regularly",
      "Eat balanced diet",
      "Limit sugar intake",
      "Avoid processed foods",
      "Regular health checkups",
      "Manage stress",
    ],
    treatment: [
      "Follow prescribed medication",
      "Monitor blood sugar levels",
      "Maintain healthy diet",
      "Regular exercise",
      "Regular doctor visits",
      "Foot care",
      "Eye examinations",
    ],
    whenToSeekHelp: [
      "Blood sugar over 300 mg/dL",
      "Persistent vomiting",
      "Signs of dehydration",
      "Difficulty breathing",
      "Confusion",
      "Severe abdominal pain",
    ],
    commonIn: ["Adults over 45", "People with family history", "Overweight individuals"],
    translations: {
      hi: {
        name: "मधुमेह",
        symptoms: [
          "बार-बार पेशाब आना",
          "अत्यधिक प्यास",
          "अस्पष्ट वजन घटना",
          "अत्यधिक थकान",
          "धुंधली दृष्टि",
          "घाव का धीरे भरना",
          "बार-बार संक्रमण",
        ],
        prevention: [
          "स्वस्थ वजन बनाए रखें",
          "नियमित व्यायाम करें",
          "संतुलित आहार लें",
          "चीनी का सेवन सीमित करें",
          "प्रसंस्कृत खाद्य पदार्थों से बचें",
          "नियमित स्वास्थ्य जांच",
          "तनाव का प्रबंधन करें",
        ],
        treatment: [
          "निर्धारित दवा का पालन करें",
          "रक्त शर्करा के स्तर की निगरानी करें",
          "स्वस्थ आहार बनाए रखें",
          "नियमित व्यायाम",
          "नियमित डॉक्टर की यात्रा",
          "पैरों की देखभाल",
          "आंखों की जांच",
        ],
        whenToSeekHelp: [
          "रक्त शर्करा 300 mg/dL से अधिक",
          "लगातार उल्टी",
          "निर्जलीकरण के संकेत",
          "सांस लेने में कठिनाई",
          "भ्रम",
          "पेट में गंभीर दर्द",
        ],
      },
    },
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "infectious",
    severity: "high",
    symptoms: [
      "High fever with chills",
      "Sweating",
      "Headache",
      "Nausea and vomiting",
      "Body aches",
      "Fatigue",
      "Diarrhea",
    ],
    prevention: [
      "Use mosquito nets",
      "Apply insect repellent",
      "Wear protective clothing",
      "Eliminate stagnant water",
      "Take preventive medication if traveling",
      "Use indoor residual spraying",
    ],
    treatment: [
      "Take prescribed antimalarial drugs",
      "Rest and stay hydrated",
      "Monitor temperature",
      "Complete full course of medication",
      "Follow up with healthcare provider",
    ],
    whenToSeekHelp: [
      "High fever with chills",
      "Severe headache",
      "Difficulty breathing",
      "Confusion",
      "Seizures",
      "Severe anemia",
    ],
    commonIn: ["Tropical regions", "Areas with poor sanitation", "Monsoon season"],
    translations: {
      hi: {
        name: "मलेरिया",
        symptoms: ["ठंड के साथ तेज बुखार", "पसीना आना", "सिरदर्द", "मतली और उल्टी", "शरीर में दर्द", "थकान", "दस्त"],
        prevention: [
          "मच्छरदानी का उपयोग करें",
          "कीट प्रतिरोधी लगाएं",
          "सुरक्षात्मक कपड़े पहनें",
          "स्थिर पानी को हटाएं",
          "यात्रा करते समय निवारक दवा लें",
          "इनडोर अवशिष्ट छिड़काव का उपयोग करें",
        ],
        treatment: [
          "निर्धारित मलेरिया रोधी दवाएं लें",
          "आराम करें और हाइड्रेटेड रहें",
          "तापमान की निगरानी करें",
          "दवा का पूरा कोर्स पूरा करें",
          "स्वास्थ्य सेवा प्रदाता के साथ फॉलो अप करें",
        ],
        whenToSeekHelp: ["ठंड के साथ तेज बुखार", "गंभीर सिरदर्द", "सांस लेने में कठिनाई", "भ्रम", "दौरे", "गंभीर एनीमिया"],
      },
    },
  },
  {
    id: "tuberculosis",
    name: "Tuberculosis (TB)",
    category: "infectious",
    severity: "high",
    symptoms: [
      "Persistent cough (3+ weeks)",
      "Coughing up blood",
      "Chest pain",
      "Weight loss",
      "Fatigue",
      "Fever",
      "Night sweats",
      "Loss of appetite",
    ],
    prevention: [
      "Get BCG vaccination",
      "Avoid close contact with TB patients",
      "Maintain good ventilation",
      "Cover mouth when coughing",
      "Maintain good nutrition",
      "Avoid smoking and alcohol",
    ],
    treatment: [
      "Take prescribed antibiotics",
      "Complete full treatment course (6-9 months)",
      "Regular medical monitoring",
      "Maintain good nutrition",
      "Isolate until non-infectious",
      "Follow up with healthcare provider",
    ],
    whenToSeekHelp: [
      "Persistent cough over 3 weeks",
      "Coughing up blood",
      "Unexplained weight loss",
      "Night sweats",
      "Persistent fever",
      "Chest pain",
    ],
    commonIn: ["People with HIV", "Malnourished individuals", "Crowded living conditions"],
    translations: {
      hi: {
        name: "तपेदिक (टीबी)",
        symptoms: [
          "लगातार खांसी (3+ सप्ताह)",
          "खून की खांसी",
          "छाती में दर्द",
          "वजन घटना",
          "थकान",
          "बुखार",
          "रात को पसीना",
          "भूख न लगना",
        ],
        prevention: [
          "बीसीजी टीकाकरण कराएं",
          "टीबी रोगियों के निकट संपर्क से बचें",
          "अच्छी हवा का संचार बनाए रखें",
          "खांसते समय मुंह ढकें",
          "अच्छा पोषण बनाए रखें",
          "धूम्रपान और शराब से बचें",
        ],
        treatment: [
          "निर्धारित एंटीबायोटिक्स लें",
          "पूरा उपचार कोर्स पूरा करें (6-9 महीने)",
          "नियमित चिकित्सा निगरानी",
          "अच्छा पोषण बनाए रखें",
          "गैर-संक्रामक होने तक अलग रहें",
          "स्वास्थ्य सेवा प्रदाता के साथ फॉलो अप करें",
        ],
        whenToSeekHelp: [
          "3 सप्ताह से अधिक लगातार खांसी",
          "खून की खांसी",
          "अस्पष्ट वजन घटना",
          "रात को पसीना",
          "लगातार बुखार",
          "छाती में दर्द",
        ],
      },
    },
  },
]

export function searchDiseases(query: string, language = "en"): DiseaseInfo[] {
  const searchTerm = query.toLowerCase()

  return diseaseDatabase.filter((disease) => {
    // Search in English name and symptoms
    const englishMatch =
      disease.name.toLowerCase().includes(searchTerm) ||
      disease.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm)) ||
      disease.category.toLowerCase().includes(searchTerm)

    // Search in translated content if available
    const translatedMatch = disease.translations[language]
      ? disease.translations[language].name.toLowerCase().includes(searchTerm) ||
        disease.translations[language].symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm))
      : false

    return englishMatch || translatedMatch
  })
}

export function getDiseaseById(id: string): DiseaseInfo | undefined {
  return diseaseDatabase.find((disease) => disease.id === id)
}

export function getDiseasesByCategory(category: DiseaseInfo["category"]): DiseaseInfo[] {
  return diseaseDatabase.filter((disease) => disease.category === category)
}

export function getDiseasesBySeverity(severity: DiseaseInfo["severity"]): DiseaseInfo[] {
  return diseaseDatabase.filter((disease) => disease.severity === severity)
}
