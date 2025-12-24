import React from 'react';

export default function Sidebar({
  isDME,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  noticesOpen,
  setNoticesOpen,
  setSelectedNoticeId,
  setOpenNotice,
  handleLogout,
  SidebarItem
}) {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-white transform transition-transform duration-300 shadow-2xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0
      `}
    >
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <div className="font-bold text-2xl tracking-wider flex items-center gap-2">
          BIMS{' '}
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              isDME ? 'bg-emerald-500' : 'bg-blue-500'
            }`}
          >
            {isDME ? 'DME' : 'DGH'}
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden ml-auto text-slate-400"
        >
          <span aria-label="Close">×</span>
        </button>
      </div>
      <nav className="p-4 space-y-2 overflow-visible">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
          Main Menu
        </div>
        <SidebarItem icon={require('lucide-react').LayoutDashboard} label="Dashboard" tabName="DASHBOARD" />
        {isDME ? (
          <>
            <SidebarItem icon={require('lucide-react').Users} label="Students Directory" tabName="LIST" />
            <div className="relative group">
              <details className="relative group" style={{width: '100%'}}>
                <summary className="flex items-center w-full px-4 py-2 mt-1 text-left rounded hover:bg-slate-800 focus:outline-none cursor-pointer list-none">
                  <span className="flex items-center gap-2">
                    <span className="inline-block"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg></span>
                    <span>Postings</span>
                  </span>
                  <svg className="ml-auto w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="absolute left-0 w-full mt-1 bg-slate-800 rounded shadow-lg z-10" style={{overflow: 'visible', maxHeight: 'none'}}>
                  <button className="block w-full text-left px-4 py-2 hover:bg-slate-700" onClick={() => setActiveTab('ASSIGN_POSTING')}>Assign Posting</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-slate-700" onClick={() => setActiveTab('VIEW_POSTING')}>View Posting Details</button>
                </div>
              </details>
            </div>
          </>
        ) : (
          <>
            <SidebarItem icon={require('lucide-react').Users} label="Doctors Directory" tabName="LIST" />
            <div className="relative group">
              <details className="relative group" style={{width: '100%'}}>
                <summary className="flex items-center w-full px-4 py-2 mt-1 text-left rounded hover:bg-slate-800 focus:outline-none cursor-pointer list-none">
                  <span className="flex items-center gap-2">
                    <span className="inline-block"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg></span>
                    <span>Postings</span>
                  </span>
                  <svg className="ml-auto w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div className="absolute left-0 w-full mt-1 bg-slate-800 rounded shadow-lg z-10" style={{overflow: 'visible', maxHeight: 'none'}}>
                  <button className="block w-full text-left px-4 py-2 hover:bg-slate-700" onClick={() => setActiveTab('VERIFY_POSTINGS')}>Verify Postings</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-slate-700" onClick={() => setActiveTab('VIEW_POSTING')}>View Posting Details</button>
                </div>
              </details>
            </div>
          </>
        )}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-950">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
              isDME ? 'bg-emerald-700' : 'bg-blue-700'
            }`}
          >
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-slate-500">
              {isDME ? 'Education Dept' : 'Health Services'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
