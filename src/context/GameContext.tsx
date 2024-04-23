import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Feedback = {
    correctPosition: number;
    incorrectPosition: number;
    incorrect: number;
};

type GameContextProps = {
    targetWord: string;
    feedback: Feedback;
    player: string;
    savePlayer: (player: string) => void;
    getGame: () => Promise<Score[]>;
    addScore: (score: Score) => void; 
};

export interface Score {
    name: string;
    score: number;
}

const wordsList: string[] = ["manzana", "banana", "pera", "uva", "sandia"];

const GameContext = createContext<GameContextProps>({
    targetWord: "",
    feedback: { correctPosition: 0, incorrectPosition: 0, incorrect: 0 },
    player: "",
    savePlayer: () => {},
    getGame: async () => [],
    addScore: () => {},
});

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame debe ser usado dentro de un GameProvider');
    }
    return context;
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [targetWord, setTargetWord] = useState<string>("");

  useEffect(() => {
      const randomIndex = Math.floor(Math.random() * wordsList.length);
      setTargetWord(wordsList[randomIndex]);
  }, []);

  const [feedback, setFeedback] = useState<Feedback>({ correctPosition: 0, incorrectPosition: 0, incorrect: 0 });

  const savePlayer = async (player: string) => {
      try {
          await AsyncStorage.setItem('player', player);
      } catch (error) {
          console.error('Error saving player:', error);
      }
  };

  const getGame = async () => {
      try {
          const scores = await AsyncStorage.getItem('scores');
          if (scores) {
              return JSON.parse(scores);
          }
          return [];
      } catch (error) {
          console.error('Error getting game:', error);
          return [];
      }
  };

  const addScore = async (score: Score) => {
      try {
          const scores = await AsyncStorage.getItem('scores');
          let scoresArray: Score[] = [];
          if (scores) {
              scoresArray = JSON.parse(scores);
          }
          scoresArray.push(score);
          await AsyncStorage.setItem('scores', JSON.stringify(scoresArray));
      } catch (error) {
          console.error('Error saving score:', error);
      }
  };

  useEffect(() => {
      console.log("Palabra objetivo seleccionada:", targetWord);
  }, [targetWord]);

  const contextValue: GameContextProps = {
      targetWord,
      feedback,
      player: "",
      savePlayer,
      getGame,
      addScore,
  };

  return (
      <GameContext.Provider value={contextValue}>
          {children}
      </GameContext.Provider>
  );
};

export default GameContext;
