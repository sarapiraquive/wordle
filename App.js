import React from 'react';
import { GameProvider } from '../wordle/src/context/GameContext';
import GameScreen from '../wordle/src/views/GameScreen';
import AppNavigation from './src/routes/AppNavigation';

const App = () => {
  return (
      <AppNavigation />
  );
};

export default App;
