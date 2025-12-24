import React from 'react';

export default function StatusBadge({ status }) {
  let styles = 'bg-gray-100 text-gray-700';
  if (status.includes('Active') || status.includes('On Duty'))
    styles = 'bg-blue-100 text-blue-700';
  if (status.includes('Internship') || status.includes('Leave'))
    styles = 'bg-orange-100 text-orange-700';
  if (status.includes('Completed')) styles = 'bg-green-100 text-green-700';
  if (status.includes('Broken') || status.includes('Transferred'))
    styles = 'bg-red-100 text-red-700';

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
