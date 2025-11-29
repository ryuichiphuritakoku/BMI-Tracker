import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { calculateBmi, getBmiCategory } from "../lib/bmi-utils";
import { Plus, RotateCcw } from "lucide-react";

interface BMIFormProps {
  onAddRecord: (weight: number, height: number, bmi: number) => void;
}

export const BMIForm: React.FC<BMIFormProps> = ({ onAddRecord }) => {
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || w <= 0) {
      setError("กรุณาระบุน้ำหนักที่ถูกต้อง (Weight must be > 0)");
      return;
    }
    if (isNaN(h) || h <= 0 || h > 3) { // Reasonable height check
      setError("กรุณาระบุส่วนสูงที่ถูกต้อง (Height must be > 0 and reasonable)");
      return;
    }

    const bmi = calculateBmi(w, h);
    onAddRecord(w, h, bmi);
    setWeight("");
    // Keep height populated as it rarely changes drastically for adults? No, let's clear it for fresh entry or keep it. 
    // UX: Clearing is safer for ensuring new measurement is deliberate.
    // But user might want to re-enter same height. Let's clear to be safe.
    // setHeight(""); 
  };

  const currentBmi = (parseFloat(weight) && parseFloat(height)) ? calculateBmi(parseFloat(weight), parseFloat(height)) : 0;
  const category = currentBmi > 0 ? getBmiCategory(currentBmi) : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>บันทึกข้อมูลใหม่ (New Record)</CardTitle>
        <CardDescription>ระบุน้ำหนักและส่วนสูงของคุณ</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="weight">น้ำหนัก (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="เช่น 65.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="height">ส่วนสูง (m)</Label>
            <Input
              id="height"
              type="number"
              step="0.01"
              placeholder="เช่น 1.75"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {currentBmi > 0 && !error && (
             <div className="p-4 bg-slate-50 rounded-lg border text-center space-y-1">
                <p className="text-sm text-muted-foreground">BMI ปัจจุบัน</p>
                <p className="text-3xl font-bold text-slate-900">{currentBmi}</p>
                {category && <p className={`text-sm font-medium ${category.color}`}>{category.label}</p>}
             </div>
          )}

          <Button type="submit" className="w-full" disabled={!weight || !height}>
            <Plus className="mr-2 h-4 w-4" /> บันทึกข้อมูล
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
