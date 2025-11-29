import React from "react";
import { BMIChart } from "../components/BMIChart";
import { BmiRecord } from "../lib/bmi-utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

interface TrendsPageProps {
  records: BmiRecord[];
}

export const TrendsPage: React.FC<TrendsPageProps> = ({ records }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">แนวโน้มสุขภาพ (Trends)</h2>
        <p className="text-slate-500">กราฟแสดงการเปลี่ยนแปลงของค่า BMI ตามช่วงเวลา</p>
      </div>

      {records.length > 0 ? (
         <BMIChart records={records} />
      ) : (
        <Card>
            <CardContent className="p-10 text-center text-slate-500">
                ไม่พบข้อมูลสำหรับการสร้างกราฟ กรุณาบันทึกข้อมูลในหน้าหลักก่อน
            </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">เกณฑ์มาตรฐาน BMI (Asia Pacific)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
                { label: "น้ำหนักน้อย", range: "< 18.5", color: "bg-blue-100 text-blue-800 border-blue-200" },
                { label: "ปกติ", range: "18.5 - 22.9", color: "bg-green-100 text-green-800 border-green-200" },
                { label: "น้ำหนักเกิน", range: "23.0 - 24.9", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
                { label: "อ้วนระดับ 1", range: "25.0 - 29.9", color: "bg-orange-100 text-orange-800 border-orange-200" },
                { label: "อ้วนระดับ 2", range: "≥ 30.0", color: "bg-red-100 text-red-800 border-red-200" },
            ].map((item) => (
                <div key={item.label} className={`p-4 rounded-lg border ${item.color} flex flex-col items-center justify-center text-center`}>
                    <span className="font-bold text-lg">{item.range}</span>
                    <span className="text-sm">{item.label}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
