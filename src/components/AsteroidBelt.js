import React from 'react';

const AsteroidBelt = ({ asteroids, currentTime, zoomLevel }) => {
  return (
    <g opacity="0.6">
      {asteroids.map(asteroid => {
        const angle = asteroid.angle + currentTime * 0.002;
        const x = Math.cos(angle * Math.PI / 180) * asteroid.orbitRadius * zoomLevel;
        const y = Math.sin(angle * Math.PI / 180) * asteroid.orbitRadius * zoomLevel;
        
        return (
          <circle
            key={asteroid.id}
            cx={x}
            cy={y}
            r={asteroid.size * zoomLevel}
            fill={asteroid.color}
          />
        );
      })}
    </g>
  );
};

export default AsteroidBelt;