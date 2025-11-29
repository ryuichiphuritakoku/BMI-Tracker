import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { HistoryPage } from "./pages/HistoryPage";
import { TrendsPage } from "./pages/TrendsPage";
import { InfoPage } from "./pages/InfoPage";
import { BmiRecord } from "./lib/bmi-utils";

export default function App() {
  const [records, setRecords] = useState<BmiRecord[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bmi_records");
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse records", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("bmi_records", JSON.stringify(records));
  }, [records]);

  const addRecord = (weight: number, height: number, bmi: number) => {
    const newRecord: BmiRecord = {
      id: crypto.randomUUID(),
      weight,
      height,
      bmi,
      date: new Date().toISOString(),
    };
    setRecords((prev) => [...prev, newRecord]);
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage records={records} onAddRecord={addRecord} />} />
          <Route path="/history" element={<HistoryPage records={records} onDelete={deleteRecord} />} />
          <Route path="/trends" element={<TrendsPage records={records} />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
