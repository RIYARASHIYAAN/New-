import React from 'react';
export default function Card({ children, ...props }) {
  return <div className="bg-white rounded shadow p-4" {...props}>{children}</div>;
}
