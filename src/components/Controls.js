import React from 'react';
import { Search, Moon, Sun, Zap, Eye, EyeOff } from 'lucide-react';

const Controls = ({
  searchTerm,
  setSearchTerm,
  isPaused,
  setIsPaused,
  showDwarfPlanets,
  setShowDwarfPlanets,
  showAsteroidBelt,
  setShowAsteroidBelt,
  isDarkMode,
  setIsDarkMode
}) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search planets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 rounded-lg bg-opacity-20 bg-white border border-opacity-30 border-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search planets"
        />
      </div>
      
      {/* Control buttons */}
     <div className="flex justify-end items-center gap-4 w-full">
  <button
    onClick={() => setIsPaused(!isPaused)}
    className="p-2 rounded-lg bg-opacity-20 bg-white hover:bg-opacity-30 transition-all"
    aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
  >
    {isPaused ? '▶️' : '⏸️'}
  </button>

  <button
    onClick={() => setShowDwarfPlanets(!showDwarfPlanets)}
    className="p-2 rounded-lg bg-opacity-20 bg-white hover:bg-opacity-30 transition-all text-sm"
    aria-label="Toggle dwarf planets"
  >
    {showDwarfPlanets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  </button>

  <button
    onClick={() => setShowAsteroidBelt(!showAsteroidBelt)}
    className="p-2 rounded-lg bg-opacity-20 bg-white hover:bg-opacity-30 transition-all"
    aria-label="Toggle asteroid belt"
  >
    <Zap className="w-4 h-4" />
  </button>

  <button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="p-2 rounded-lg bg-opacity-20 bg-white hover:bg-opacity-30 transition-all"
    aria-label="Toggle theme"
  >
    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
  </button>
</div>

    </div>
  );
};

export default Controls;