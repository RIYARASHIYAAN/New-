import React from 'react';
export default function Sidebar({ items, active, onSelect }) {
  return (
    <aside className="bg-slate-900 text-white w-64 min-h-screen p-4">
      <div className="font-bold text-2xl mb-8">BIMS</div>
      <ul>
        {items.map((item) => (
          <li key={item} className={`mb-2 p-2 rounded cursor-pointer ${active === item ? 'bg-slate-700' : ''}`} onClick={() => onSelect(item)}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
