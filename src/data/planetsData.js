export const planetsData = [
    {
    id: 'sun',
    name: 'Sun',
    size: 50,           
    orbitRadius: 0,     
    color: '#FFD700',  
    speed: 0,          
    distance: '0 km',
    moons: 0,
    dayLength: '25 Earth days (approx. at equator)',
    facts: [
      'Central star of the solar system',
      'Contains 99.8% of the solar system’s mass',
      'Generates energy through nuclear fusion'
    ],
    composition: 'Ball of hot plasma mostly hydrogen and helium'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    size: 8,
    orbitRadius: 80,
    color: '#8C7853',
    speed: 0.02,
    distance: '57.9 million km',
    moons: 0,
    dayLength: '176 Earth days',
    facts: [
      'Closest planet to the Sun',
      'No atmosphere',
      'Extreme temperature variations'
    ],
    composition: 'Rocky planet with iron core'
  },
  {
    id: 'venus',
    name: 'Venus',
    size: 12,
    orbitRadius: 110,
    color: '#FF6B35',
    speed: 0.015,
    distance: '108.2 million km',
    moons: 0,
    dayLength: '243 Earth days',
    facts: [
      'Hottest planet in solar system',
      'Thick toxic atmosphere',
      'Rotates backwards'
    ],
    composition: 'Rocky planet with dense atmosphere'
  },
  {
    id: 'earth',
    name: 'Earth',
    size: 14,
    orbitRadius: 140,
    color: '#4A90E2',
    speed: 0.01,
    distance: '149.6 million km',
    moons: 1,
    dayLength: '24 hours',
    facts: [
      'Only known planet with life',
      '71% covered by water',
      'Has protective magnetic field'
    ],
    composition: 'Rocky planet with water and atmosphere'
  },
  {
    id: 'mars',
    name: 'Mars',
    size: 11,
    orbitRadius: 170,
    color: '#CD5C5C',
    speed: 0.008,
    distance: '227.9 million km',
    moons: 2,
    dayLength: '24.6 hours',
    facts: [
      'Known as the Red Planet',
      'Has polar ice caps',
      'Evidence of ancient water'
    ],
    composition: 'Rocky planet with iron oxide surface'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    size: 35,
    orbitRadius: 220,
    color: '#D2691E',
    speed: 0.005,
    distance: '778.5 million km',
    moons: 95,
    dayLength: '9.9 hours',
    facts: [
      'Largest planet in solar system',
      'Great Red Spot storm',
      'Gas giant with no solid surface'
    ],
    composition: 'Gas giant made mostly of hydrogen and helium'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    size: 30,
    orbitRadius: 270,
    color: '#FAD5A5',
    speed: 0.003,
    distance: '1.43 billion km',
    moons: 146,
    dayLength: '10.7 hours',
    facts: [
      'Famous for its ring system',
      'Less dense than water',
      'Has hexagonal storm at north pole'
    ],
    composition: 'Gas giant with spectacular ring system'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    size: 22,
    orbitRadius: 320,
    color: '#4FD0E7',
    speed: 0.002,
    distance: '2.87 billion km',
    moons: 27,
    dayLength: '17.2 hours',
    facts: [
      'Rotates on its side',
      'Ice giant with methane atmosphere',
      'Has faint ring system'
    ],
    composition: 'Ice giant with water, methane and ammonia ices'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    size: 20,
    orbitRadius: 370,
    color: '#4169E1',
    speed: 0.001,
    distance: '4.5 billion km',
    moons: 14,
    dayLength: '16.1 hours',
    facts: [
      'Windiest planet with speeds up to 2,100 km/h',
      'Deep blue color from methane',
      'Takes 165 Earth years to orbit Sun'
    ],
    composition: 'Ice giant with dynamic atmosphere'
  }
];

export const dwarfPlanets = [
  {
    id: 'pluto',
    name: 'Pluto',
    size: 4,
    orbitRadius: 420,
    color: '#DEB887',
    speed: 0.0005,
    distance: '5.9 billion km',
    moons: 5,
    dayLength: '6.4 Earth days',
    facts: [
      'Largest dwarf planet',
      'Has heart-shaped feature',
      'Binary system with Charon'
    ],
    composition: 'Dwarf planet with nitrogen atmosphere'
  }
];

export const generateAsteroidBelt = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: `asteroid-${i}`,
    size: Math.random() * 2 + 1,
    orbitRadius: 190 + Math.random() * 20,
    angle: (i / 30) * 360,
    color: '#696969'
  }));
};