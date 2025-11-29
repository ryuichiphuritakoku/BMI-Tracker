import React from "react";
import { BMIForm } from "../components/BMIForm";
import { BmiRecord, getBmiCategory } from "../lib/bmi-utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, User } from "lucide-react";

interface DashboardPageProps {
  records: BmiRecord[];
  onAddRecord: (weight: number, height: number, bmi: number) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ records, onAddRecord }) => {
  // Get latest record
  const latestRecord = records.length > 0 ? records[records.length - 1] : null;
  const latestCategory = latestRecord ? getBmiCategory(latestRecord.bmi) : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">หน้าหลัก (Dashboard)</h2>
        <p className="text-slate-500">ภาพรวมสุขภาพและการบันทึกข้อมูลล่าสุด</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Add Form */}
        <div className="space-y-6">
          <BMIForm onAddRecord={onAddRecord} />
        </div>

        {/* Right: Quick Stats */}
        <div className="space-y-6">
          {latestRecord ? (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  สถานะล่าสุดของคุณ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6 space-y-2">
                  <span className="text-sm text-slate-500">BMI ล่าสุด ({new Date(latestRecord.date).toLocaleDateString('th-TH')})</span>
                  <span className="text-5xl font-bold text-slate-900">{latestRecord.bmi}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${latestCategory?.color.replace('text-', 'bg-').replace('600', '100').replace('500', '100')} ${latestCategory?.color}`}>
                    {latestCategory?.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">น้ำหนัก</p>
                    <p className="text-xl font-semibold text-slate-700">{latestRecord.weight} <span className="text-sm font-normal text-slate-400">kg</span></p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">ส่วนสูง</p>
                    <p className="text-xl font-semibold text-slate-700">{latestRecord.height} <span className="text-sm font-normal text-slate-400">m</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-blue-50 border-blue-100 h-full flex flex-col justify-center items-center text-center p-6">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900">ยินดีต้อนรับ</h3>
              <p className="text-blue-600/80 max-w-xs mt-2">เริ่มต้นบันทึกข้อมูลสุขภาพของคุณวันนี้ เพื่อติดตามผลลัพธ์ที่ดีขึ้น</p>
            </Card>
          )}

          {/* Summary Count */}
          <div className="grid grid-cols-2 gap-4">
             <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-slate-900">{records.length}</span>
                   <span className="text-sm text-slate-500">บันทึกทั้งหมด</span>
                </CardContent>
             </Card>
             <Card>
                <CardContent className="p-6 flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-slate-900">{records.length > 0 ? Math.max(...records.map(r => r.weight)) : '-'}</span>
                   <span className="text-sm text-slate-500">น้ำหนักสูงสุด</span>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
