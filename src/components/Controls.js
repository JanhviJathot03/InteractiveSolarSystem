import React from 'react';
import { Search, Moon, Sun, Zap, Eye, EyeOff } from 'lucide-react';
import '../styles/App.css'; 

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
  
  React.useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return (
    <div className="controls-container">
      {/* Search */}
      <div className="search-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search planets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Search planets"
        />
      </div>

      {/* Control buttons */}
      <div className="controls-buttons">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="control-button"
          aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
        >
          {isPaused ? '▶️' : '⏸️'}
        </button>

        <button
          onClick={() => setShowDwarfPlanets(!showDwarfPlanets)}
          className="control-button"
          aria-label="Toggle dwarf planets"
        >
          {showDwarfPlanets ? <EyeOff className="icon" /> : <Eye className="icon" />}
        </button>

        <button
          onClick={() => setShowAsteroidBelt(!showAsteroidBelt)}
          className="control-button"
          aria-label="Toggle asteroid belt"
        >
          <Zap className="icon" />
        </button>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="control-button"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="icon" /> : <Moon className="icon" />}
        </button>
      </div>
    </div>
  );
};

export default Controls;
