import React from 'react';
import { ChevronRight } from 'lucide-react';

const notices = [
  { id: 1, title: 'General Notice', body: 'General notices and circulars will appear here. Click to expand for details.' },
  { id: 2, title: 'Legal Notes', body: 'Legal clarifications, statutory updates and notes are listed under Legal Notes.' },
  { id: 3, title: 'Recovering Certificate', body: 'Instructions and forms for recovering certificates are available here.' },
];

export default function Notices({ openNotice, setOpenNotice }) {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-slate-700 mb-2">Notices & Circulars</h3>
      {notices.map((n) => (
        <div key={n.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenNotice(openNotice === n.id ? null : n.id)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <div>
              <div className="font-semibold text-slate-800">{n.title}</div>
              <div className="text-xs text-slate-500">{n.body.split('.')[0]}.</div>
            </div>
            <ChevronRight className={`text-slate-400 transition-transform ${openNotice === n.id ? 'rotate-90' : ''}`} />
          </button>
          {openNotice === n.id && (
            <div className="px-4 pb-4 pt-2 text-slate-600 text-sm border-t border-slate-100">
              <p>{n.body}</p>
              <p className="mt-2 text-xs text-slate-400">Last updated: Dec 2025</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
