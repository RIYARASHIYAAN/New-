import React from 'react';
import { Activity, Building2, ChevronRight } from 'lucide-react';

export default function SelectionScreen({ handlePortalSelect }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight">
          Medical Education Dept
        </h1>
        <p className="text-slate-500 text-lg">
          Unified Bond Information Management System (BIMS)
        </p>
      </div>
      <div className="grid gap-6 w-full max-w-lg">
        <div
          onClick={() => handlePortalSelect('DG_HEALTH')}
          className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer flex items-center gap-6 transition-all active:scale-95"
        >
          <div className="bg-blue-50 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
            <Activity className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">DG Health</h2>
            <p className="text-sm text-slate-500">
              Directorate General of Health Services
            </p>
          </div>
          <ChevronRight className="ml-auto text-slate-300 group-hover:text-blue-500" />
        </div>
        <div
          onClick={() => handlePortalSelect('DME')}
          className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 cursor-pointer flex items-center gap-6 transition-all active:scale-95"
        >
          <div className="bg-emerald-50 p-4 rounded-full group-hover:bg-emerald-100 transition-colors">
            <Building2 className="text-emerald-600" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">DME</h2>
            <p className="text-sm text-slate-500">
              Director of Medical Education
            </p>
          </div>
          <ChevronRight className="ml-auto text-slate-300 group-hover:text-emerald-500" />
        </div>
      </div>
      <p className="mt-12 text-xs text-slate-400">
        © 2025 Government of India
      </p>
    </div>
  );
}
