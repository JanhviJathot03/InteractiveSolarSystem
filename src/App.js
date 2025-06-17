import React, { useState, useEffect, useRef } from 'react';
import { Sun, Globe } from 'lucide-react';

// Import components
import Planet from './components/Planet';
import AsteroidBelt from './components/AsteroidBelt';
import InfoCard from './components/InfoCard';
import Controls from './components/Controls';

// Import data
import { planetsData, dwarfPlanets, generateAsteroidBelt } from './data/planetsData';

// Import styles
import './styles/App.css';
import './styles/animations.css';

const App = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showDwarfPlanets, setShowDwarfPlanets] = useState(false);
  const [showAsteroidBelt, setShowAsteroidBelt] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // ✅ NEW: Track actual container width & height
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const animationRef = useRef();
  const asteroidBelt = useRef(generateAsteroidBelt());
  const lastTimeRef = useRef(performance.now());
  const currentTimeRef = useRef(0);




  // ✅ Update width/height on resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Correct animation loop with real elapsed time
  useEffect(() => {
  
  const animate = (now) => {
    const elapsed = (now - lastTimeRef.current) / 1000;

    if (!isPaused) {
      // ✅ Update ref for smooth physics
      currentTimeRef.current += elapsed;
      // ✅ Trigger re-render
      setCurrentTime(currentTimeRef.current);
    }

    lastTimeRef.current = now;
    animationRef.current = requestAnimationFrame(animate);
  };

  animationRef.current = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationRef.current);
}, [isPaused]);

  // Filter planets based on search + toggle dwarf planets
  const filteredPlanets = planetsData.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const allPlanets = showDwarfPlanets
    ? [...filteredPlanets, ...dwarfPlanets.filter(dp =>
        dp.name.toLowerCase().includes(searchTerm.toLowerCase())
      )]
    : filteredPlanets;

  // Mouse drag + zoom
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const newZoom = Math.max(0.5, Math.min(3, zoomLevel + (e.deltaY > 0 ? -0.1 : 0.1)));
    setZoomLevel(newZoom);
  };

  const handlePlanetClick = (planet) => setSelectedPlanet(planet);

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className={`solar-system-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      {/* Header */}
      <header className="header">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Sun className="text-yellow-400" />
            Interactive Solar System
          </h1>
          <Controls
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            showDwarfPlanets={showDwarfPlanets}
            setShowDwarfPlanets={setShowDwarfPlanets}
            showAsteroidBelt={showAsteroidBelt}
            setShowAsteroidBelt={setShowAsteroidBelt}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>
      </header>

      <div className="main-content">
        {/* Solar System Visualization */}
        <div className="solar-system-view">
          <svg
            className="w-full h-full cursor-grab active:cursor-grabbing"
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
          >
            <defs>
              <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFA500" />
              </radialGradient>
            </defs>

            {/* ✅ Use tracked width/height */}
            <g transform={`translate(${width / 2}, ${height / 2})`}>
              {/* Sun */}
              <circle
                cx="0"
                cy="0"
                r={25 * zoomLevel}
                fill="url(#sunGradient)"
                className="animate-pulse"
                style={{ filter: 'drop-shadow(0 0 20px #FFD700)' }}
              />
              <text
                x="0"
                y={35 * zoomLevel}
                textAnchor="middle"
                fill={isDarkMode ? 'white' : 'black'}
                fontSize={12 * zoomLevel}
                className="font-bold"
              >
                Sun
              </text>

              {/* Asteroid Belt */}
              {showAsteroidBelt && (
                <AsteroidBelt
                  asteroids={asteroidBelt.current}
                  currentTime={currentTime}
                  zoomLevel={zoomLevel}
                />
              )}

              {/* Planets */}
              {allPlanets.map(planet => (
                <Planet
                  key={planet.id}
                  planet={planet}
                  isSelected={selectedPlanet?.id === planet.id}
                  currentTime={currentTime}
                  zoomLevel={zoomLevel}
                  onPlanetClick={handlePlanetClick}
                />
              ))}
            </g>
          </svg>

          {/* Zoom controls */}
          <div className="zoom-controls">
            <button
              onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.2))}
              className="control-button"
              aria-label="Zoom in"
            >
              ➕
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
              className="control-button"
              aria-label="Zoom out"
            >
              ➖
            </button>
            <button
              onClick={resetView}
              className="control-button text-xs"
              aria-label="Reset view"
            >
              🎯
            </button>
          </div>
        </div>

        {/* Planet Information Panel */}
        {selectedPlanet && (
          <div className="planet-info-panel">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="text-blue-400" />
                {selectedPlanet.name}
              </h2>
              <button
                onClick={() => setSelectedPlanet(null)}
                className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-all"
                aria-label="Close planet information"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4"
                style={{
                  backgroundColor: selectedPlanet.color,
                  filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                }}
              />
              <div className="grid grid-cols-1 gap-3">
                <InfoCard label="Distance from Sun" value={selectedPlanet.distance} />
                <InfoCard label="Day Length" value={selectedPlanet.dayLength} />
                <InfoCard label="Number of Moons" value={selectedPlanet.moons} />
                <InfoCard label="Composition" value={selectedPlanet.composition} />
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">Interesting Facts</h3>
                <ul className="space-y-2">
                  {selectedPlanet.facts.map((fact, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 p-2 rounded-lg bg-opacity-10 bg-white animate-fadeInUp"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
