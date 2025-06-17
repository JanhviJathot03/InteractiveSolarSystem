import React from 'react';
import '../styles/App.css';

const InfoCard = ({ label, value }) => (
  <div className="info-card">
    <div className="info-card-label">{label}</div>
    <div className="info-card-value">{value}</div>
  </div>
);

export default InfoCard;
