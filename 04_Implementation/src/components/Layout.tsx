import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, History, BarChart3, Home, Info } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "หน้าหลัก (Dashboard)", icon: Home },
    { path: "/history", label: "ประวัติสุขภาพ (History)", icon: History },
    { path: "/trends", label: "แนวโน้ม (Trends)", icon: BarChart3 },
    { path: "/info", label: "เกณฑ์วัด (Criteria)", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for PC */}
      <aside className="w-full md:w-64 bg-white border-r shadow-sm flex-shrink-0 min-h-screen hidden md:block fixed left-0 top-0 bottom-0 z-10">
        <div className="p-6 border-b flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Activity className="h-6 w-6" />
          </div>
          <h1 className="font-bold text-slate-900 text-lg">BMI Tracker</h1>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <p className="text-xs text-slate-400 text-center">Version 1.0.0 (Prototype)</p>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex items-center gap-2 sticky top-0 z-20">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Activity className="h-5 w-5" />
          </div>
          <h1 className="font-bold text-slate-900">BMI Tracker</h1>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-20 pb-safe">
        {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-slate-500"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label.split(' ')[0]}</span>
            </Link>
          ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
