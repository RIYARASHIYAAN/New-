import React from 'react';
export default function Dropdown({ options, value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="border rounded px-2 py-1">
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  );
}
