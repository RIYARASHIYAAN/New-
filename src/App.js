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
  const [openNotice, setOpenNotice] = useState(null);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  // Assign Posting form state
  const [postingLetterNo, setPostingLetterNo] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [hospital, setHospital] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [joiningLetterNo, setJoiningLetterNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bondNotCompleted, setBondNotCompleted] = useState(true);
  const [noticeLetterNo, setNoticeLetterNo] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [postings, setPostings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAssignForm, setShowAssignForm] = useState(false);

  const handleAssignCancel = () => {
    setPostingLetterNo('');
    setDistrict('');
    setTehsil('');
    setHospital('');
    setIssueDate('');
    setJoiningLetterNo('');
    setStartDate('');
    setEndDate('');
    setBondNotCompleted(true);
    setNoticeLetterNo('');
    setNoticeDate('');
    setEditingId(null);
    setShowAssignForm(false);
  };

  const handleAssignSave = () => {
    const payload = {
      postingLetterNo,
      district,
      tehsil,
      hospital,
      issueDate,
      joiningLetterNo,
      startDate,
      endDate,
      bondNotCompleted,
      noticeLetterNo,
      noticeDate,
    };
    if (editingId) {
      setPostings((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p)));
    } else {
      const newItem = { id: Date.now(), ...payload };
      setPostings((prev) => [newItem, ...prev]);
    }
    console.log('Assign Posting saved:', payload);
    // after save show list
    setShowAssignForm(false);
    handleAssignCancel();
  };

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

          <div className="px-2">
            <button
              onClick={() => {
                setNoticesOpen(!noticesOpen);
                setActiveTab('NOTICES');
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-1
                ${activeTab === 'NOTICES' && !noticesOpen ? 'bg-white/10 text-white border-l-4 border-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Bell size={18} />
              <span className="font-medium text-sm">Notices & Circulars</span>
              <ChevronRight className={`ml-auto text-slate-400 transition-transform ${noticesOpen ? 'rotate-90' : ''}`} />
            </button>

            {noticesOpen && (
              <div className="ml-6 mt-1 space-y-1">
                {[{ id: 1, title: 'General Notice' }, { id: 2, title: 'Legal Notes' }, { id: 3, title: 'Recovering Certificate' }].map((n) => (
                  <button
                    key={n.id}
                    onClick={() => {
                      setActiveTab('NOTICES');
                      setSelectedNoticeId(n.id);
                      setOpenNotice(n.id);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors ${selectedNoticeId === n.id ? 'bg-white/5 text-white font-semibold' : 'text-slate-400 hover:bg-white/3 hover:text-white'}`}
                  >
                    <span className="text-xs">•</span>
                    <span className="truncate">{n.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <SidebarItem
            icon={Briefcase}
            label="Assign Posting"
            tabName="ASSIGN_POSTING"
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

          {/* TAB: NOTICES */}
          {activeTab === 'NOTICES' && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-slate-700 mb-2">Notices & Circulars</h3>
              {[
                { id: 1, title: 'General Notice', body: 'General notices and circulars will appear here. Click to expand for details.' },
                { id: 2, title: 'Legal Notes', body: 'Legal clarifications, statutory updates and notes are listed under Legal Notes.' },
                { id: 3, title: 'Recovering Certificate', body: 'Instructions and forms for recovering certificates are available here.' },
              ].map((n) => (
                <div key={n.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenNotice(openNotice === n.id ? null : n.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{n.title}</div>
                      <div className="text-xs text-slate-500">{n.body.split('.').slice(0,1)}.</div>
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
          )}

            {/* TAB: ASSIGN POSTING */}
            {activeTab === 'ASSIGN_POSTING' && (showAssignForm || editingId || postings.length === 0) && (
              <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-700">Posting Details</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        handleAssignCancel();
                        setShowAssignForm(true);
                        setActiveTab('ASSIGN_POSTING');
                      }}
                      className="text-sm px-3 py-1 rounded border border-slate-200"
                    >
                      Add New
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Posting Letter No*</label>
                    <input
                      value={postingLetterNo}
                      onChange={(e) => setPostingLetterNo(e.target.value)}
                      placeholder="Enter Posting Letter No #"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">District*</label>
                    <input
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Enter district"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tehsil*</label>
                    <input
                      value={tehsil}
                      onChange={(e) => setTehsil(e.target.value)}
                      placeholder="Enter tehsil"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Hospital*</label>
                    <input
                      value={hospital}
                      onChange={(e) => setHospital(e.target.value)}
                      placeholder="Enter hospital"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Issue Date*</label>
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Joining Letter No*</label>
                    <input
                      value={joiningLetterNo}
                      onChange={(e) => setJoiningLetterNo(e.target.value)}
                      placeholder="Enter Joining Letter No #"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => setBondNotCompleted(!bondNotCompleted)}
                    className={`px-3 py-1 rounded ${bondNotCompleted ? 'bg-rose-700 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    {bondNotCompleted ? 'Bond Not Completed' : 'Bond Completed'}
                  </button>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Notice Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Letter No.</label>
                      <input
                        value={noticeLetterNo}
                        onChange={(e) => setNoticeLetterNo(e.target.value)}
                        placeholder="Enter the letter number"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-slate-600 mb-1">Date of Issue</label>
                      <input
                        type="date"
                        value={noticeDate}
                        onChange={(e) => setNoticeDate(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={handleAssignCancel} className="px-4 py-2 rounded border border-slate-300 text-slate-700">Cancel</button>
                  <button onClick={handleAssignSave} className={`px-4 py-2 rounded ${themeColor} text-white`}>Save</button>
                </div>
              </div>
            )}

            {/* Saved Postings List */}
            {activeTab === 'ASSIGN_POSTING' && !showAssignForm && postings.length > 0 && (
              <div className="mt-6 max-w-3xl mx-auto space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-700">Saved Postings</h4>
                  <button
                    onClick={() => {
                      handleAssignCancel();
                      setShowAssignForm(true);
                    }}
                    className="text-sm px-3 py-1 rounded bg-emerald-600 text-white"
                  >
                    + Add New
                  </button>
                </div>
                {postings.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">{p.postingLetterNo || '—'} • {p.district || '—'}</div>
                      <div className="text-sm text-slate-500">{p.hospital || ''} {p.startDate ? `• ${p.startDate}` : ''}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          // load into form for editing
                          setEditingId(p.id);
                          setPostingLetterNo(p.postingLetterNo || '');
                          setDistrict(p.district || '');
                          setTehsil(p.tehsil || '');
                          setHospital(p.hospital || '');
                          setIssueDate(p.issueDate || '');
                          setJoiningLetterNo(p.joiningLetterNo || '');
                          setStartDate(p.startDate || '');
                          setEndDate(p.endDate || '');
                          setBondNotCompleted(!!p.bondNotCompleted);
                          setNoticeLetterNo(p.noticeLetterNo || '');
                          setNoticeDate(p.noticeDate || '');
                          setShowAssignForm(true);
                        }}
                        className="px-3 py-1 text-sm rounded border border-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setPostings((prev) => prev.filter((x) => x.id !== p.id))}
                        className="px-3 py-1 text-sm rounded border border-rose-200 text-rose-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Other placeholder tabs */}
          {['BONDS', 'POSTINGS'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Briefcase size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Module Under Development</h3>
              <p className="text-slate-500 max-w-sm mt-2">The {activeTab.toLowerCase()} module is currently being built.</p>
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
