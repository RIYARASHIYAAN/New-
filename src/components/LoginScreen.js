import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function LoginScreen({
  isDME,
  email,
  setEmail,
  password,
  setPassword,
  loginError,
  handleLogin,
  setView
}) {
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
        <div
          className={`text-xs p-2 rounded mb-6 ${
            isDME ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
          }`}
        >
          <span className="font-bold">Demo:</span> User: <b>{isDME ? 'dme@gov.in' : 'dg@gov.in'}</b> | Pass: <b>{isDME ? 'dme123' : 'dg123'}</b>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          {loginError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} /> {loginError}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email ID</label>
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
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
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
              isDME ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
