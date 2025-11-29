export interface BmiRecord {
  id: string;
  weight: number; // kg
  height: number; // m
  bmi: number;
  date: string; // ISO string
}

export const calculateBmi = (weight: number, height: number): number => {
  if (height <= 0) return 0;
  const bmi = weight / (height * height);
  return parseFloat(bmi.toFixed(1));
};

export const getBmiCategory = (bmi: number): { label: string; color: string } => {
  if (bmi < 18.5) return { label: "น้ำหนักน้อย / ผอม (Underweight)", color: "text-blue-500" };
  if (bmi < 23) return { label: "ปกติ (Normal)", color: "text-green-500" }; // Asian criteria often used in TH, but standard is < 25. I'll use standard < 25 for general, or Asian < 23. The prompt doesn't specify, but it's Thai language. Thai health guidelines often use < 23 as normal, 23-24.9 overweight, > 25 obese.
  // Let's stick to International for simplicity unless specified, OR generic ranges.
  // WHO: < 18.5 Underweight, 18.5-24.9 Normal, 25-29.9 Overweight, >= 30 Obese.
  // Asia-Pacific: < 18.5 Underweight, 18.5-22.9 Normal, 23-24.9 Overweight, >= 25 Obese.
  // Given the language is Thai, I will use the Asia-Pacific guidelines which are commonly used in Thailand.
  // < 18.5: Underweight
  // 18.5 - 22.9: Normal
  // 23.0 - 24.9: Overweight (Risk)
  // 25.0 - 29.9: Obese 1
  // > 30: Obese 2
  
  // Simplified for the prompt's "Simple Business Logic":
  if (bmi < 18.5) return { label: "น้ำหนักน้อย (Underweight)", color: "text-blue-600" };
  if (bmi <= 22.9) return { label: "ปกติ (Normal)", color: "text-green-600" };
  if (bmi <= 24.9) return { label: "น้ำหนักเกิน (Overweight)", color: "text-yellow-600" };
  if (bmi <= 29.9) return { label: "อ้วนระดับ 1 (Obese 1)", color: "text-orange-600" };
  return { label: "อ้วนระดับ 2 (Obese 2)", color: "text-red-600" };
};
