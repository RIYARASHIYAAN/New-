import React from 'react';

export default function Dashboard({ stats, isDME, dataList, StatusBadge, setActiveTab, themeText }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${stat.color} hover:shadow-md transition-shadow`}
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.title}</p>
            <h3 className="text-3xl font-extrabold text-slate-800">{stat.val}</h3>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-700">Recent {isDME ? 'Admissions' : 'Postings'}</h3>
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
                <th className="px-6 py-3 font-semibold">Bond Status</th>
                <th className="px-6 py-3 font-semibold">Internship Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isDME && dataList.slice(0, 3).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4"><StatusBadge status={"Bounded"} /></td>
                  <td className="px-6 py-4"><StatusBadge status={"Completed"} /></td>
                </tr>
              ))}
              {!isDME && dataList.slice(0, 3).map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-800">{item.name}</td>
                  <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                  <td className="px-6 py-4 text-slate-500">{item.posting}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
