export interface HealthInput {
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'vegan';
  hemoglobin?: number;
  bloodSugarFasting?: number;
  bloodSugarRandom?: number;
  bpSystolic?: number;
  bpDiastolic?: number;
  cholesterol?: number;
}

export type HealthStatus = 'normal' | 'warning' | 'critical';

export interface ParameterResult {
  parameter: string;
  userValue: string;
  normalRange: string;
  status: HealthStatus;
  explanation: string;
  lifestyleTips: string;
  voiceReadyText: string;
}

export interface HealthReport {
  parameters: ParameterResult[];
  bmi: number;
  bmiCategory: string;
  bmiExplanation: string;
  disclaimer: string;
}

export interface DietChartEntry {
  meal: string;
  time: string;
  vegOptions: string[];
  nonVegOptions: string[];
}

export interface FoodRecommendation {
  parameter: string;
  status: HealthStatus;
  prefer: string[];
  limit: string[];
}

export interface FitnessGuidance {
  activities: { name: string; description: string; duration: string; icon: string }[];
  generalTips: string[];
}
