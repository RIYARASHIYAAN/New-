import React, { useState } from 'react';

const initialPostings = [
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
];

export default function ViewPosting() {
  const [postings] = useState(initialPostings);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">View Posting Details</h3>
      <table className="w-full text-left text-sm bg-white rounded shadow border">
        <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Student Name</th>
            <th className="px-4 py-2">Batch</th>
            <th className="px-4 py-2">Student Status</th>
            <th className="px-4 py-2">District</th>
            <th className="px-4 py-2">Hospital</th>
          </tr>
        </thead>
        <tbody>
          {postings.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2">{p.student?.name || ''}</td>
              <td className="px-4 py-2">{p.batch || p.student?.batch || ''}</td>
              <td className="px-4 py-2">{p.status}</td>
              <td className="px-4 py-2">{p.district}</td>
              <td className="px-4 py-2">{p.hospital}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
