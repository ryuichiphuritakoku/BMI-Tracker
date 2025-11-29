import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BmiRecord } from "../lib/bmi-utils";

interface BMIChartProps {
  records: BmiRecord[];
}

export const BMIChart: React.FC<BMIChartProps> = ({ records }) => {
  // Sort records by date ascending for the chart
  const data = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(r => ({
    date: new Date(r.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' }),
    bmi: r.bmi,
    fullDate: new Date(r.date).toLocaleDateString('th-TH')
  }));

  if (data.length === 0) {
    return null; 
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>แนวโน้มสุขภาพ (BMI Trends)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                labelStyle={{ color: '#64748b' }}
              />
              <ReferenceLine y={18.5} stroke="#3b82f6" strokeDasharray="3 3" label={{ position: 'insideTopLeft',  value: 'ผอม', fill: '#3b82f6', fontSize: 10 }} />
              <ReferenceLine y={23} stroke="#22c55e" strokeDasharray="3 3" label={{ position: 'insideTopLeft',  value: 'ปกติ', fill: '#22c55e', fontSize: 10 }} />
              <ReferenceLine y={25} stroke="#eab308" strokeDasharray="3 3" label={{ position: 'insideTopLeft',  value: 'เกิน', fill: '#eab308', fontSize: 10 }} />
              <ReferenceLine y={30} stroke="#f97316" strokeDasharray="3 3" label={{ position: 'insideTopLeft',  value: 'อ้วน', fill: '#f97316', fontSize: 10 }} />
              <Line type="monotone" dataKey="bmi" stroke="#0f172a" strokeWidth={2} activeDot={{ r: 6 }} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
