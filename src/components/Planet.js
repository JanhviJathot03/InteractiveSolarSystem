import React, { useState } from 'react';

const Planet = ({
  planet,
  isSelected,
  currentTime,
  zoomLevel,
  onPlanetClick,
  isDarkMode,
  x,
  y 
}) => {
  const [isHovered, setIsHovered] = useState(false);



  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onPlanetClick(planet);
    }
  };

  return (
    <g>
      {/* Orbit path with theme-aware stroke */}
      <circle
        cx="0"
        cy="0"
        r={planet.orbitRadius}
        fill="none"
        stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.2)"}
        strokeWidth="1"
        strokeDasharray="5,5"
      />

      {/* Planet */}
      <circle
        cx={x}
        cy={y}
        r={
          planet.size *
          (isSelected ? 1.2 : isHovered ? 1.1 : 1)
        }
        fill={planet.color}
        stroke={
          isSelected || isHovered
            ? '#FFD700'
            : isDarkMode
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0,0,0,0.2)'
        }
        strokeWidth={
          isSelected || isHovered ? 3 : 1
        }
        className="cursor-pointer transition-all duration-300"
        onClick={() => onPlanetClick(planet)}
        style={{
          filter:
            isSelected || isHovered
              ? 'drop-shadow(0 0 10px #FFD700)'
              : 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
        }}
        role="button"
        tabIndex="0"
        aria-label={`${planet.name} - Click for more information`}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Planet label */}
      <text
        x={x}
        y={y + planet.size + 15}
        textAnchor="middle"
        fill={isDarkMode ? 'white' : 'black'}
        fontSize={10}
        className="font-medium"
      >
        {planet.name}
      </text>
    </g>
  );
};

export default Planet;
