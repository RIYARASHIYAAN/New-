import React from 'react';
import { Search, Filter, Plus, Eye } from 'lucide-react';

export default function DirectoryTable({ isDME, dataList, themeColor, StatusBadge, onActionClick }) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
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
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Bond Status</th>
                <th className="px-6 py-4 font-semibold">Internship Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isDME && dataList.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4"><StatusBadge status={"Bounded"} /></td>
                  <td className="px-6 py-4"><StatusBadge status={"Completed"} /></td>
                  <td className="px-6 py-4 text-right">
                    {onActionClick ? (
                      <button className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors" onClick={() => onActionClick(item)}>
                        <Eye size={18} />
                      </button>
                    ) : (
                      <Eye size={18} className="text-slate-300" />
                    )}
                  </td>
                </tr>
              ))}
              {!isDME && dataList.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                  <td className="px-6 py-4 text-slate-500">{item.district}</td>
                  <td className="px-6 py-4 text-slate-500">{item.posting}</td>
                  <td className="px-6 py-4 font-mono text-slate-600">{item.bondStatus}</td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
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
  );
}
