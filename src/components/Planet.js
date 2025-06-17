import React from 'react';

const Planet = ({ planet, isSelected, currentTime, zoomLevel, onPlanetClick }) => {
  // ✅ Compute radians properly:
  const angle = currentTime * planet.speed * 2 * Math.PI;
  const x = Math.cos(angle) * planet.orbitRadius;
  const y = Math.sin(angle) * planet.orbitRadius;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
    //   e.preventDefault();
      onPlanetClick(planet);
    }
  };

  return (
    <g>
      {/* Orbit path */}
      <circle
        cx="0"
        cy="0"
        r={planet.orbitRadius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Planet */}
      <circle
        cx={x}
        cy={y}
        r={planet.size}
        fill={planet.color}
        stroke={isSelected ? '#FFD700' : 'rgba(255,255,255,0.2)'}
        strokeWidth={isSelected ? 3 : 1}
        className="cursor-pointer transition-all duration-300 hover:brightness-125"
        onClick={() => onPlanetClick(planet)}
        style={{
          filter: isSelected
            ? 'drop-shadow(0 0 10px #FFD700)'
            : 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
        }}
        role="button"
        tabIndex="0"
        aria-label={`${planet.name} - Click for more information`}
        onKeyDown={handleKeyDown}
      />

      {/* Planet label */}
      <text
        x={x}
        y={y + planet.size + 15}
        textAnchor="middle"
        fill="white"
        fontSize={10}
        className="font-medium"
      >
        {planet.name}
      </text>
    </g>
  );
};

export default Planet;
