import React from 'react';
export default function Table({ columns, data }) {
  return (
    <table className="w-full text-left text-sm bg-white rounded shadow border">
      <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
        <tr>
          {columns.map((col) => <th key={col} className="px-4 py-2">{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => <td key={col} className="px-4 py-2">{row[col.toLowerCase()]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
