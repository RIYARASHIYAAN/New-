
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SidebarItem from './components/SidebarItem';
import StatusBadge from './components/StatusBadge';
import SelectionScreen from './components/SelectionScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import DirectoryTable from './components/DirectoryTable';
import Notices from './components/Notices';
import AssignPosting from './components/AssignPosting';
import { LogOut, Menu, Briefcase } from 'lucide-react';

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
  // const [tehsil, setTehsil] = useState(''); // removed tehsil
  const [batch, setBatch] = useState('');
  const [hospital, setHospital] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [joiningLetterNo, setJoiningLetterNo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [bondNotCompleted, setBondNotCompleted] = useState(true);
  const [noticeLetterNo, setNoticeLetterNo] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [postings, setPostings] = useState([
    {
      id: 1,
      student: { name: 'Rahul Kumar', batch: '2019' },
      batch: '2019',
      district: 'Bhopal',
      hospital: 'GMC Bhopal',
      status: 'Bounded',
    },
    {
      id: 2,
      student: { name: 'Priya Singh', batch: '2020' },
      batch: '2020',
      district: 'Indore',
      hospital: 'GMC Indore',
      status: 'Bounded',
    },
  ]);
    const [verifyStatus, setVerifyStatus] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewPostingTab, setViewPostingTab] = useState(false);

  const handleAssignCancel = () => {
    setPostingLetterNo('');
    setDistrict('');
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
    // Basic validation for required fields
    if (!selectedStudent || !selectedStudent.name || !batch || !district || !hospital) {
      alert('Please fill all required fields: Student, Batch, District, Hospital.');
      return;
    }
    const payload = {
      postingLetterNo: postingLetterNo || '',
      district: district || '',
      batch: batch || '',
      hospital: hospital || '',
      issueDate: issueDate || '',
      joiningLetterNo: joiningLetterNo || '',
      startDate: startDate || '',
      endDate: endDate || '',
      bondNotCompleted: bondNotCompleted || false,
      noticeLetterNo: noticeLetterNo || '',
      noticeDate: noticeDate || '',
      status: 'Bounded',
    };
    if (editingId) {
      setPostings((prev) => prev.map((p) => (p.id === editingId ? { ...p, ...payload, student: selectedStudent } : p)));
    } else {
      const newItem = { id: Date.now(), ...payload, student: selectedStudent };
      setPostings((prev) => [newItem, ...prev]);
    }
    console.log('Assign Posting saved:', payload);
    // after save show list
    setShowAssignForm(false);
    setActiveTab('VIEW_POSTING');
    setViewPostingTab(true);
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




  // --- VIEW 1: SELECTION SCREEN ---
  if (view === 'SELECTION') {
    return <SelectionScreen handlePortalSelect={handlePortalSelect} />;
  }


  // --- VIEW 2: LOGIN SCREEN ---
  if (view === 'LOGIN') {
    const isDME = portalType === 'DME';
    return (
      <LoginScreen
        isDME={isDME}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loginError={loginError}
        handleLogin={handleLogin}
        setView={setView}
      />
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
      <Sidebar
        isDME={isDME}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        noticesOpen={noticesOpen}
        setNoticesOpen={setNoticesOpen}
        setSelectedNoticeId={setSelectedNoticeId}
        setOpenNotice={setOpenNotice}
        handleLogout={handleLogout}
        SidebarItem={(props) => (
          <SidebarItem
            {...props}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      />

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
                ' Posting'}
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
          {activeTab === 'DASHBOARD' && (
            <Dashboard
              stats={stats}
              isDME={isDME}
              dataList={dataList}
              StatusBadge={StatusBadge}
              setActiveTab={setActiveTab}
              themeText={themeText}
            />
          )}
          {activeTab === 'LIST' && (
            <DirectoryTable
              isDME={isDME}
              dataList={dataList}
              themeColor={themeColor}
              StatusBadge={StatusBadge}
              onActionClick={(student) => {
                setSelectedStudent(student);
                setActiveTab('ASSIGN_POSTING');
                setShowAssignForm(true);
              }}
            />
          )}
                    {activeTab === 'VIEW_POSTING' && (
                      <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4">View Posting Details</h3>
                        <div className="text-slate-500 text-center py-8">No posting details to show here. Please check DGH Verify Postings.</div>
                      </div>
                    )}
                              {activeTab === 'VERIFY_POSTINGS' && (
                                <div className="mt-8">
                                  <h3 className="text-lg font-bold mb-4">Verify Postings</h3>
                                  <table className="w-full text-left text-sm bg-white rounded shadow border">
                                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                      <tr>
                                        <th className="px-4 py-2">Student Name</th>
                                        <th className="px-4 py-2">Batch</th>
                                        <th className="px-4 py-2">Student Status</th>
                                        <th className="px-4 py-2">District</th>
                                        <th className="px-4 py-2">Hospital</th>
                                          <th className="px-4 py-2">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {postings.map((p) => (
                                        <tr key={p.id}>
                                          <td className="px-4 py-2">{p.student?.name || ''}</td>
                                          <td className="px-4 py-2">{p.batch || p.student?.batch || ''}</td>
                                          <td className="px-4 py-2">Bounded</td>
                                          <td className="px-4 py-2">{p.district}</td>
                                          <td className="px-4 py-2">{p.hospital}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                              <button
                                                className="px-3 py-1 rounded bg-green-600 text-white text-xs font-semibold hover:bg-green-700"
                                                onClick={() => setVerifyStatus((prev) => ({ ...prev, [p.id]: 'verified' }))}
                                              >Verify</button>
                                              <button
                                                className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                                                onClick={() => setVerifyStatus((prev) => ({ ...prev, [p.id]: 'rejected' }))}
                                              >Reject</button>
                                            </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                    {Object.entries(verifyStatus).map(([id, status]) => (
                                      <div key={id} className={`mt-4 text-lg font-bold ${status === 'verified' ? 'text-green-600' : 'text-red-600'}`}>
                                        Request for student ID {id} {status === 'verified' ? 'verified' : 'rejected'}.
                                      </div>
                                    ))}
                                </div>
                              )}
          {activeTab === 'NOTICES' && (
            <Notices openNotice={openNotice} setOpenNotice={setOpenNotice} />
          )}
          {activeTab === 'ASSIGN_POSTING' && (
            <AssignPosting
              postingLetterNo={postingLetterNo}
              setPostingLetterNo={setPostingLetterNo}
              district={district}
              setDistrict={setDistrict}
              batch={batch}
              setBatch={setBatch}
              hospital={hospital}
              setHospital={setHospital}
              issueDate={issueDate}
              setIssueDate={setIssueDate}
              joiningLetterNo={joiningLetterNo}
              setJoiningLetterNo={setJoiningLetterNo}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              bondNotCompleted={bondNotCompleted}
              setBondNotCompleted={setBondNotCompleted}
              noticeLetterNo={noticeLetterNo}
              setNoticeLetterNo={setNoticeLetterNo}
              noticeDate={noticeDate}
              setNoticeDate={setNoticeDate}
              handleAssignCancel={handleAssignCancel}
              handleAssignSave={handleAssignSave}
              showAssignForm={showAssignForm}
              editingId={editingId}
              postings={postings}
              setEditingId={setEditingId}
              setShowAssignForm={setShowAssignForm}
              setPostings={setPostings}
              themeColor={themeColor}
              selectedStudent={selectedStudent}
            />
          )}
          {/* Other placeholder tabs */}
          {['BONDS', 'POSTINGS'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <Briefcase size={48} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">Assign Posting</h3>
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
