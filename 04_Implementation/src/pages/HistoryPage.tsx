import React from "react";
import { BMIHistory } from "../components/BMIHistory";
import { BmiRecord } from "../lib/bmi-utils";

interface HistoryPageProps {
  records: BmiRecord[];
  onDelete: (id: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ records, onDelete }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">ประวัติสุขภาพ (History)</h2>
        <p className="text-slate-500">รายการบันทึกข้อมูลทั้งหมดของคุณ</p>
      </div>
      
      <BMIHistory records={records} onDelete={onDelete} />
    </div>
  );
};
