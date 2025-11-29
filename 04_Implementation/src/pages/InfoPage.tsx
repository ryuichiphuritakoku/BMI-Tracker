import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Info } from "lucide-react";

export const InfoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">เกณฑ์วัดและข้อมูลสุขภาพ (Criteria & Info)</h2>
        <p className="text-slate-500">ข้อมูลเกี่ยวกับดัชนีมวลกาย (BMI) และวิธีการคำนวณ</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            BMI คืออะไร?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            <strong>ดัชนีมวลกาย (Body Mass Index: BMI)</strong> คือค่าดัชนีที่ใช้ชี้วัดความสมดุลของน้ำหนักตัว (Weight) และส่วนสูง (Height) ซึ่งสามารถระบุได้ว่าร่างกายอยู่ในเกณฑ์ปกติ ผอม หรืออ้วน โดยใช้สูตรการคำนวณดังนี้:
          </p>
          <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-lg my-4 border border-slate-200">
            BMI = น้ำหนัก (kg) / ส่วนสูง (m)²
          </div>
          <p>
            ค่า BMI เป็นเครื่องมือคัดกรองเบื้องต้นที่มีประโยชน์ แต่ไม่ได้วัดปริมาณไขมันในร่างกายโดยตรง นักกีฬาที่มีมวลกล้ามเนื้อมากอาจมีค่า BMI สูงแม้ว่าจะมีไขมันต่ำ
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>เกณฑ์มาตรฐานสำหรับคนเอเชีย (Asia-Pacific Criteria)</CardTitle>
          <CardDescription>อ้างอิงจากองค์การอนามัยโลก (WHO) สำหรับประชากรเอเชีย</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
              <thead className="bg-slate-50 text-slate-700 uppercase">
                <tr>
                  <th className="px-6 py-3 border-b">ค่า BMI (kg/m²)</th>
                  <th className="px-6 py-3 border-b">ความหมาย</th>
                  <th className="px-6 py-3 border-b">ความเสี่ยงโรค</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-blue-600">น้อยกว่า 18.5</td>
                  <td className="px-6 py-4">น้ำหนักน้อย / ผอม</td>
                  <td className="px-6 py-4 text-slate-500">ต่ำกว่าเกณฑ์ (เสี่ยงขาดสารอาหาร)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-green-600">18.5 - 22.9</td>
                  <td className="px-6 py-4">ปกติ (สมส่วน)</td>
                  <td className="px-6 py-4 text-slate-500">เท่ากับคนปกติ</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-yellow-600">23.0 - 24.9</td>
                  <td className="px-6 py-4">น้ำหนักเกิน (ท้วม)</td>
                  <td className="px-6 py-4 text-slate-500">เพิ่มขึ้น</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-orange-600">25.0 - 29.9</td>
                  <td className="px-6 py-4">อ้วนระดับ 1</td>
                  <td className="px-6 py-4 text-slate-500">อันตราย</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-red-600">มากกว่า 30.0</td>
                  <td className="px-6 py-4">อ้วนระดับ 2 (อันตรายมาก)</td>
                  <td className="px-6 py-4 text-slate-500">อันตรายมาก</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
