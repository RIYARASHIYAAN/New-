import React from 'react';
export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-xl">BIMS</span>
      <button className="text-red-500 font-semibold">Logout</button>
    </nav>
  );
}
