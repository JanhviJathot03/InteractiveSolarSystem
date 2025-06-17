import React from 'react';

const InfoCard = ({ label, value }) => (
  <div className="p-3 rounded-lg bg-opacity-10 bg-white backdrop-blur-sm">
    <div className="text-sm opacity-75 mb-1">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

export default InfoCard;