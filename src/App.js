import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  FileText,
  Briefcase,
  Bell,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ChevronRight,
  Building2,
  Activity,
  Search,
  Filter,
  Plus,
  Eye,
  AlertCircle,
} from 'lucide-react';

// --- MOCK DATA FOR DME (Education Focused) ---
const STUDENTS_DME = [
  {
    id: 1,
    name: 'Rahul Kumar',
    batch: '2019',
    college: 'GMC Bhopal',
    status: 'Bond Active',
    bondAmount: '₹10 Lakh',
  },
  {
    id: 2,
    name: 'Priya Singh',
    batch: '2020',
    college: 'GMC Indore',
    status: 'Internship',
    bondAmount: '₹5 Lakh',
  },
  {
    id: 3,
    name: 'Amit Verma',
    batch: '2019',
    college: 'GMC Jabalpur',
    status: 'Bond Completed',
    bondAmount: '₹0',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    batch: '2021',
    college: 'GMC Bhopal',
    status: 'Studying',
    bondAmount: '₹10 Lakh',
  },
];

// --- MOCK DATA FOR DG HEALTH (Posting/Service Focused) ---
const DOCTORS_DG = [
  {
    id: 101,
    name: 'Dr. Vikram Malhotra',
    posting: 'PHC Sehore',
    district: 'Sehore',
    status: 'On Duty',
    bondStatus: 'Active',
  },
  {
    id: 102,
    name: 'Dr. Anjali Deshmukh',
    posting: 'District Hospital',
    district: 'Indore',
    status: 'Leave',
    bondStatus: 'Active',
  },
  {
    id: 103,
    name: 'Dr. Rohan Mehra',
    posting: 'CHC Raisen',
    district: 'Raisen',
    status: 'On Duty',
    bondStatus: 'Active',
  },
  {
    id: 104,
    name: 'Dr. Suman Rao',
    posting: 'Civil Hospital',
    district: 'Bhopal',
    status: 'Transferred',
    bondStatus: 'Completing Soon',
  },
];

export default function App() {
  const [view, setView] = useState('SELECTION'); // SELECTION, LOGIN, DASHBOARD
  const [portalType, setPortalType] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  const [loginError, setLoginError] = useState('');

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Handlers ---
  const handlePortalSelect = (type) => {
    setPortalType(type);
    setLoginError('');
    setEmail('');
    setPassword('');
    setView('LOGIN');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // --- STRICT PASSWORD LOGIC ---
    if (portalType === 'DG_HEALTH') {
      if (email === 'dg@gov.in' && password === 'dg123') {
        setView('DASHBOARD');
        setActiveTab('DASHBOARD');
        if (window.innerWidth < 768) setSidebarOpen(false);
      } else {
        setLoginError('Invalid Credentials! Use: dg@gov.in / dg123');
      }
    } else if (portalType === 'DME') {
      if (email === 'dme@gov.in' && password === 'dme123') {
        setView('DASHBOARD');
        setActiveTab('DASHBOARD');
        if (window.innerWidth < 768) setSidebarOpen(false);
      } else {
        setLoginError('Invalid Credentials! Use: dme@gov.in / dme123');
      }
    }
  };

  const handleLogout = () => {
    setView('SELECTION');
    setPortalType(null);
    setSidebarOpen(true);
  };

  // --- COMPONENT: Sidebar Item ---
  const SidebarItem = ({ icon: Icon, label, tabName }) => (
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

  // --- COMPONENT: Status Badge ---
  const StatusBadge = ({ status }) => {
    let styles = 'bg-gray-100 text-gray-700';
    if (status.includes('Active') || status.includes('On Duty'))
      styles = 'bg-blue-100 text-blue-700';
    if (status.includes('Internship') || status.includes('Leave'))
      styles = 'bg-orange-100 text-orange-700';
    if (status.includes('Completed')) styles = 'bg-green-100 text-green-700';
    if (status.includes('Broken') || status.includes('Transferred'))
      styles = 'bg-red-100 text-red-700';

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}
      >
        {status}
      </span>
    );
  };

  // --- VIEW 1: SELECTION SCREEN ---
  if (view === 'SELECTION') {
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

  // --- VIEW 2: LOGIN SCREEN ---
  if (view === 'LOGIN') {
    const isDME = portalType === 'DME';
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 ${
          isDME ? 'bg-emerald-50' : 'bg-blue-50'
        }`}
      >
        <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
          <button
            onClick={() => setView('SELECTION')}
            className="text-sm text-slate-400 hover:text-slate-600 mb-8 flex items-center gap-1 font-medium"
          >
            &larr; Back to Selection
          </button>

          <h2
            className={`text-3xl font-bold mb-2 ${
              isDME ? 'text-emerald-700' : 'text-blue-700'
            }`}
          >
            {isDME ? 'DME Login' : 'DG Health Login'}
          </h2>
          <p className="text-slate-500 mb-4">Enter your secure credentials.</p>

          {/* Hint for Demo */}
          <div
            className={`text-xs p-2 rounded mb-6 ${
              isDME
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            <span className="font-bold">Demo:</span> User:{' '}
            <b>{isDME ? 'dme@gov.in' : 'dg@gov.in'}</b> | Pass:{' '}
            <b>{isDME ? 'dme123' : 'dg123'}</b>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={16} /> {loginError}
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email ID
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                style={{ '--tw-ring-color': isDME ? '#10b981' : '#3b82f6' }}
                placeholder="name@dept.gov.in"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                style={{ '--tw-ring-color': isDME ? '#10b981' : '#3b82f6' }}
                placeholder="••••••••"
              />
            </div>
            <button
              className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all ${
                isDME
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW 3: DASHBOARD SCREEN ---
  const isDME = portalType === 'DME';
  const themeColor = isDME ? 'bg-emerald-600' : 'bg-blue-600';
  const themeText = isDME ? 'text-emerald-600' : 'text-blue-600';
  const dataList = isDME ? STUDENTS_DME : DOCTORS_DG;

  // Define unique stats for each portal
  const stats = isDME
    ? [
        // DME STATS
        { title: 'Total Students', val: '450', color: 'border-emerald-500' },
        { title: 'Bonds Active', val: '320', color: 'border-blue-500' },
        { title: 'Medical Colleges', val: '13', color: 'border-orange-500' },
        { title: 'Pending Reviews', val: '15', color: 'border-purple-500' },
      ]
    : [
        // DG HEALTH STATS
        { title: 'Doctors on Duty', val: '850', color: 'border-blue-500' },
        { title: 'Rural Postings', val: '420', color: 'border-green-500' },
        { title: 'Health Centers', val: '52', color: 'border-red-500' },
        { title: 'Transfer Requests', val: '28', color: 'border-yellow-500' },
      ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
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
            <X />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">
            Main Menu
          </div>

          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            tabName="DASHBOARD"
          />

          {/* Different Menu items based on Portal */}
          {isDME ? (
            <>
              <SidebarItem
                icon={Users}
                label="Students Directory"
                tabName="LIST"
              />
              <SidebarItem
                icon={GraduationCap}
                label="Bond Management"
                tabName="BONDS"
              />
            </>
          ) : (
            <>
              <SidebarItem
                icon={Users}
                label="Doctors Directory"
                tabName="LIST"
              />
              <SidebarItem
                icon={Briefcase}
                label="Postings & Transfers"
                tabName="POSTINGS"
              />
            </>
          )}

          <SidebarItem
            icon={Bell}
            label="Notices & Circulars"
            tabName="NOTICES"
          />
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu />
            </button>
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              {activeTab === 'DASHBOARD' && 'Dashboard Overview'}
              {activeTab === 'LIST' &&
                (isDME ? 'Student Management' : 'Doctor Management')}
              {!['DASHBOARD', 'LIST'].includes(activeTab) &&
                'Page Under Construction'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />{' '}
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* TAB: DASHBOARD */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${stat.color} hover:shadow-md transition-shadow`}
                  >
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-extrabold text-slate-800">
                      {stat.val}
                    </h3>
                  </div>
                ))}
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-700">
                    Recent {isDME ? 'Admissions' : 'Postings'}
                  </h3>
                  <button
                    onClick={() => setActiveTab('LIST')}
                    className={`text-sm font-bold ${themeText} hover:underline`}
                  >
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Name</th>
                        <th className="px-6 py-3 font-semibold">Status</th>
                        <th className="px-6 py-3 font-semibold">
                          {isDME ? 'College' : 'Location'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataList.slice(0, 3).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 font-medium text-slate-800">
                            {item.name}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={item.status} />
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {isDME ? item.college : item.posting}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: LIST (Full Table) */}
          {activeTab === 'LIST' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="relative w-full md:w-64">
                  <Search
                    className="absolute left-3 top-2.5 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={`Search ${isDME ? 'students' : 'doctors'}...`}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium">
                    <Filter size={18} /> Filter
                  </button>
                  <button
                    className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-medium shadow-md transition-transform active:scale-95 ${themeColor}`}
                  >
                    <Plus size={18} /> Add New
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                      <tr>
                        <th className="px-6 py-4 font-semibold">ID</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">
                          {isDME ? 'Batch' : 'District'}
                        </th>
                        <th className="px-6 py-4 font-semibold">
                          {isDME ? 'College' : 'Current Posting'}
                        </th>
                        <th className="px-6 py-4 font-semibold">
                          {isDME ? 'Bond Amt' : 'Bond Status'}
                        </th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dataList.map((item) => (
                        <tr
                          key={item.id}
                          className="group hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-slate-400">
                            #{item.id}
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-700">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {isDME ? item.batch : item.district}
                          </td>
                          <td className="px-6 py-4 text-slate-500">
                            {isDME ? item.college : item.posting}
                          </td>
                          <td className="px-6 py-4 font-mono text-slate-600">
                            {isDME ? item.bondAmount : item.bondStatus}
                          </td>
                          <td className="px-6 py-4">
                            <StatusBadge status={item.status} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors">
                              <Eye size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OTHER TABS (Placeholder) */}
          {['BONDS', 'NOTICES', 'POSTINGS'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Briefcase size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">
                Module Under Development
              </h3>
              <p className="text-slate-500 max-w-sm mt-2">
                The {activeTab.toLowerCase()} module is currently being built.
              </p>
            </div>
          )}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
