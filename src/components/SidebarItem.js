import React from 'react';

export default function SidebarItem({ icon: Icon, label, tabName, activeTab, setActiveTab, setSidebarOpen }) {
  return (
    <div
      onClick={() => {
        setActiveTab(tabName);
        if (window.innerWidth < 768) setSidebarOpen(false);
      }}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-1
        ${
          activeTab === tabName
            ? 'bg-white/10 text-white border-l-4 border-white'
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
        }
      `}
    >
      <Icon size={18} />
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}
