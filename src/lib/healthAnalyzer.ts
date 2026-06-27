import { HealthInput, HealthReport, ParameterResult, HealthStatus, DietChartEntry, FoodRecommendation, FitnessGuidance } from './types';

const DISCLAIMER = "This application provides educational health information only. It does not give medical diagnosis or treatment. Please consult a qualified healthcare professional for medical advice.";

function classifyStatus(value: number, low: number, high: number, criticalLow: number, criticalHigh: number): HealthStatus {
  if (value >= low && value <= high) return 'normal';
  if (value < criticalLow || value > criticalHigh) return 'critical';
  return 'warning';
}

function analyzeHemoglobin(value: number, gender: string): ParameterResult {
  const isMale = gender === 'male';
  const low = isMale ? 13 : 12;
  const high = isMale ? 17 : 15;
  const critLow = isMale ? 10 : 9;
  const critHigh = isMale ? 19 : 17;
  const status = classifyStatus(value, low, high, critLow, critHigh);
  const range = `${low}–${high} g/dL`;

  const explanations: Record<HealthStatus, string> = {
    normal: "Your hemoglobin level is within the commonly observed healthy range. This is a good sign that your blood is carrying oxygen well.",
    warning: value < low
      ? "Your hemoglobin is slightly below the commonly observed healthy range. This may mean your body needs more iron-rich foods."
      : "Your hemoglobin is slightly above the commonly observed healthy range. Staying well hydrated is important.",
    critical: value < critLow
      ? "Your hemoglobin is notably below the commonly observed healthy range. It would be wise to speak with a healthcare professional."
      : "Your hemoglobin is notably above the commonly observed healthy range. Please consider consulting a healthcare professional."
  };

  return {
    parameter: "Hemoglobin (Hb)",
    userValue: `${value} g/dL`,
    normalRange: range,
    status,
    explanation: explanations[status],
    lifestyleTips: status === 'normal'
      ? "Keep eating iron-rich foods like spinach, lentils, and dates."
      : "Consider adding more green leafy vegetables, beetroot, and pomegranate to your meals.",
    voiceReadyText: `Your hemoglobin level is ${value} grams per deciliter. The commonly healthy range is ${low} to ${high}. ${explanations[status]}`
  };
}

function analyzeBloodSugarFasting(value: number): ParameterResult {
  const status = classifyStatus(value, 70, 99, 50, 126);
  const range = "70–99 mg/dL";

  const explanations: Record<HealthStatus, string> = {
    normal: "Your fasting blood sugar is within the commonly observed healthy range. Your body is managing sugar well.",
    warning: value < 70
      ? "Your fasting blood sugar is slightly below the commonly observed range. Eating regular meals can help."
      : "Your fasting blood sugar is slightly above the commonly observed range. Reducing sugary foods may help.",
    critical: value < 50
      ? "Your fasting blood sugar is notably low. Please consult a healthcare professional soon."
      : "Your fasting blood sugar is notably above the commonly observed range. Please speak with a healthcare professional."
  };

  return {
    parameter: "Blood Sugar (Fasting)",
    userValue: `${value} mg/dL`,
    normalRange: range,
    status,
    explanation: explanations[status],
    lifestyleTips: status === 'normal'
      ? "Continue eating balanced meals with whole grains, vegetables, and proteins."
      : "Choose whole grains over refined ones. Add more fiber to your meals. Walk after eating.",
    voiceReadyText: `Your fasting blood sugar is ${value} milligrams per deciliter. The commonly healthy range is 70 to 99. ${explanations[status]}`
  };
}

function analyzeBloodPressure(systolic: number, diastolic: number): ParameterResult {
  let status: HealthStatus = 'normal';
  if (systolic > 140 || diastolic > 90 || systolic < 80 || diastolic < 50) status = 'critical';
  else if (systolic > 120 || diastolic > 80 || systolic < 90 || diastolic < 60) status = 'warning';

  const explanations: Record<HealthStatus, string> = {
    normal: "Your blood pressure is within the commonly observed healthy range. This is a positive sign for your heart health.",
    warning: "Your blood pressure is slightly outside the commonly observed healthy range. Reducing salt and staying active may help.",
    critical: "Your blood pressure is notably outside the commonly observed healthy range. Please consider consulting a healthcare professional."
  };

  return {
    parameter: "Blood Pressure",
    userValue: `${systolic}/${diastolic} mmHg`,
    normalRange: "90/60 – 120/80 mmHg",
    status,
    explanation: explanations[status],
    lifestyleTips: status === 'normal'
      ? "Keep up your healthy habits. Regular walking and low-salt food help maintain good blood pressure."
      : "Try reducing salt in your food. Gentle walking for 20-30 minutes daily can be very helpful.",
    voiceReadyText: `Your blood pressure is ${systolic} over ${diastolic}. The commonly healthy range is 90 over 60 to 120 over 80. ${explanations[status]}`
  };
}

function analyzeCholesterol(value: number): ParameterResult {
  const status = classifyStatus(value, 125, 200, 100, 240);
  const range = "125–200 mg/dL";

  const explanations: Record<HealthStatus, string> = {
    normal: "Your cholesterol level is within the commonly observed healthy range. This is good for your heart.",
    warning: value < 125
      ? "Your cholesterol is slightly below the commonly observed range. Eating healthy fats can help."
      : "Your cholesterol is slightly above the commonly observed range. Choosing healthier cooking oils may help.",
    critical: "Your cholesterol is notably outside the commonly observed healthy range. Please consider consulting a healthcare professional."
  };

  return {
    parameter: "Cholesterol (Total)",
    userValue: `${value} mg/dL`,
    normalRange: range,
    status,
    explanation: explanations[status],
    lifestyleTips: status === 'normal'
      ? "Continue eating fruits, vegetables, and foods with healthy fats like nuts and fish."
      : "Choose cooking oils like olive or mustard oil. Eat more fruits, oats, and nuts. Limit fried foods.",
    voiceReadyText: `Your total cholesterol is ${value} milligrams per deciliter. The commonly healthy range is 125 to 200. ${explanations[status]}`
  };
}

function calculateBMI(weight: number, heightCm: number): { bmi: number; category: string; explanation: string } {
  const heightM = heightCm / 100;
  const bmi = Math.round((weight / (heightM * heightM)) * 10) / 10;

  let category: string;
  let explanation: string;

  if (bmi < 18.5) {
    category = "Below healthy range";
    explanation = "Your body weight is slightly below the commonly recommended range. Eating nutritious meals regularly can help you maintain a healthy weight.";
  } else if (bmi <= 24.9) {
    category = "Healthy range";
    explanation = "Your body weight is within the commonly recommended healthy range. Keep up your balanced eating and activity habits.";
  } else if (bmi <= 29.9) {
    category = "Above healthy range";
    explanation = "Your body weight is slightly above the commonly recommended range. Gentle daily activity and balanced meals can be helpful.";
  } else {
    category = "Well above healthy range";
    explanation = "Your body weight is notably above the commonly recommended range. Speaking with a healthcare professional about a comfortable plan could be beneficial.";
  }

  return { bmi, category, explanation };
}

export function analyzeHealth(input: HealthInput): HealthReport {
  const parameters: ParameterResult[] = [];

  if (input.hemoglobin !== undefined && input.hemoglobin > 0) {
    parameters.push(analyzeHemoglobin(input.hemoglobin, input.gender));
  }
  if (input.bloodSugarFasting !== undefined && input.bloodSugarFasting > 0) {
    parameters.push(analyzeBloodSugarFasting(input.bloodSugarFasting));
  }
  if (input.bpSystolic !== undefined && input.bpDiastolic !== undefined && input.bpSystolic > 0) {
    parameters.push(analyzeBloodPressure(input.bpSystolic, input.bpDiastolic));
  }
  if (input.cholesterol !== undefined && input.cholesterol > 0) {
    parameters.push(analyzeCholesterol(input.cholesterol));
  }

  const { bmi, category, explanation } = calculateBMI(input.weight, input.height);

  return {
    parameters,
    bmi,
    bmiCategory: category,
    bmiExplanation: explanation,
    disclaimer: DISCLAIMER,
  };
}

export function getDietChart(preference: string): DietChartEntry[] {
  const isVeg = preference === 'vegetarian' || preference === 'vegan';
  return [
    {
      meal: "Early Morning",
      time: "6:00 – 7:00 AM",
      vegOptions: ["Warm water with lemon", "Soaked almonds (4-5)", "Green tea or herbal tea"],
      nonVegOptions: isVeg ? [] : ["Warm water with lemon", "Soaked almonds (4-5)", "Green tea"],
    },
    {
      meal: "Breakfast",
      time: "8:00 – 9:00 AM",
      vegOptions: ["Oats porridge with fruits", "Idli with sambar", "Whole wheat toast with peanut butter", "Poha with vegetables"],
      nonVegOptions: isVeg ? [] : ["Boiled eggs with toast", "Egg dosa", "Omelette with vegetables"],
    },
    {
      meal: "Mid-Morning Snack",
      time: "11:00 AM",
      vegOptions: ["Seasonal fruit", "Buttermilk", "Handful of nuts"],
      nonVegOptions: isVeg ? [] : ["Seasonal fruit", "Buttermilk", "Handful of nuts"],
    },
    {
      meal: "Lunch",
      time: "12:30 – 1:30 PM",
      vegOptions: ["Brown rice or roti (2)", "Dal or sambar", "Seasonal vegetable curry", "Salad", "Curd"],
      nonVegOptions: isVeg ? [] : ["Brown rice or roti (2)", "Grilled chicken or fish curry", "Seasonal vegetable", "Salad", "Curd"],
    },
    {
      meal: "Evening Snack",
      time: "4:00 – 5:00 PM",
      vegOptions: ["Roasted chana", "Fruit salad", "Vegetable soup", "Sprouts chat"],
      nonVegOptions: isVeg ? [] : ["Roasted chana", "Chicken soup", "Fruit salad"],
    },
    {
      meal: "Dinner",
      time: "7:00 – 8:00 PM",
      vegOptions: ["Roti (1-2) with light curry", "Vegetable khichdi", "Moong dal with rice", "Salad"],
      nonVegOptions: isVeg ? [] : ["Roti (1-2) with chicken or fish", "Light dal", "Salad", "Grilled fish with vegetables"],
    },
  ];
}

export function getFoodRecommendations(report: HealthReport): FoodRecommendation[] {
  const recs: FoodRecommendation[] = [];

  for (const param of report.parameters) {
    if (param.status === 'normal') continue;
    if (param.parameter.includes("Hemoglobin")) {
      recs.push({
        parameter: "Hemoglobin",
        status: param.status,
        prefer: ["Spinach & green leafy vegetables", "Beetroot", "Pomegranate", "Dates & raisins", "Lentils & beans", "Jaggery"],
        limit: ["Excessive tea or coffee with meals", "Processed foods"],
      });
    }
    if (param.parameter.includes("Blood Sugar")) {
      recs.push({
        parameter: "Blood Sugar",
        status: param.status,
        prefer: ["Whole grains (brown rice, oats)", "Bitter gourd", "Fenugreek seeds", "Green vegetables", "Cinnamon"],
        limit: ["White sugar & sweets", "White rice in large portions", "Sugary drinks", "Refined flour products"],
      });
    }
    if (param.parameter.includes("Blood Pressure")) {
      recs.push({
        parameter: "Blood Pressure",
        status: param.status,
        prefer: ["Bananas", "Garlic", "Low-fat dairy", "Leafy greens", "Berries"],
        limit: ["Excess salt", "Pickles", "Papad", "Processed & packaged foods", "Canned soups"],
      });
    }
    if (param.parameter.includes("Cholesterol")) {
      recs.push({
        parameter: "Cholesterol",
        status: param.status,
        prefer: ["Oats & barley", "Nuts (almonds, walnuts)", "Olive oil or mustard oil", "Fish (omega-3)", "Fruits & vegetables"],
        limit: ["Fried foods", "Butter & ghee in excess", "Red meat", "Full-fat dairy", "Bakery products"],
      });
    }
  }
  return recs;
}

export function getFitnessGuidance(age: number, activityLevel: string): FitnessGuidance {
  const activities = [];

  activities.push({
    name: "Walking",
    description: age > 60 ? "Gentle walking at your own pace. Start with short distances." : "Brisk walking in a park or safe area.",
    duration: age > 60 ? "15-20 minutes, twice daily" : "30-45 minutes daily",
    icon: "👟",
  });

  activities.push({
    name: "Stretching",
    description: "Simple stretching exercises to keep your body flexible and reduce stiffness.",
    duration: "10-15 minutes daily",
    icon: "🧘",
  });

  if (age <= 65) {
    activities.push({
      name: "Yoga",
      description: "Basic yoga poses like Tadasana, Vrikshasana, and breathing exercises (Pranayama).",
      duration: "20-30 minutes daily",
      icon: "🕉️",
    });
  }

  activities.push({
    name: "Deep Breathing",
    description: "Slow, deep breathing exercises to help you relax and improve lung health.",
    duration: "5-10 minutes, 2-3 times daily",
    icon: "🌬️",
  });

  if (age < 50) {
    activities.push({
      name: "Light Cycling",
      description: "Gentle cycling on flat ground for cardiovascular health.",
      duration: "20-30 minutes, 3-4 times per week",
      icon: "🚴",
    });
  }

  const generalTips = [
    "Always warm up before any exercise.",
    "Drink water before, during, and after physical activity.",
    "Stop immediately if you feel pain, dizziness, or discomfort.",
    "Wear comfortable clothing and proper footwear.",
    "Exercise at the same time each day to build a healthy habit.",
    "If you have any health conditions, please consult a healthcare professional before starting a new activity.",
  ];

  return { activities, generalTips };
}
