import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useGame, Score } from '../context/GameContext'; 
import { useNavigation } from '@react-navigation/native';

const GameScreen: React.FC = () => {
    const { addScore, } = useGame();
    const [targetWord, setTargetWord] = useState<string>("");
    const [grid, setGrid] = useState<string[][]>([]);
    const [currentRow, setCurrentRow] = useState<number>(0);
    const navigation = useNavigation();

    useEffect(() => {
        const wordsList: string[] = ["manzana", "banana", "pera", "uva", "sandia"];
        const randomIndex = Math.floor(Math.random() * wordsList.length);
        const selectedWord = wordsList[randomIndex];
        setTargetWord(selectedWord);
        const initialGrid = Array.from({ length: 6 }, () => Array(selectedWord.length).fill(""));
        setGrid(initialGrid);
    }, []);

    const handleLetterChange = (letter: string, rowIndex: number, colIndex: number) => {
        const newGrid = [...grid];
        newGrid[rowIndex][colIndex] = letter.toUpperCase();
        setGrid(newGrid);
    };

    const getCellColor = (letter: string, rowIndex: number, colIndex: number) => {
        const inputLetter = letter.toUpperCase();
        const targetLetter = targetWord[colIndex].toUpperCase();

        if (currentRow === rowIndex) {
            if (inputLetter === targetLetter) {
                return "#B5EAD7"; 
            } else if (inputLetter !== "" && targetWord.split("").some((char, index) => char.toUpperCase() === inputLetter && index !== colIndex)) {
                return "#FFE6CC";
            } else if (inputLetter !== "") {
                return "#FFCCCC"; 
            }
        } else {
            return "white"; 
        }

        return "white"; 
    };

    const handleAttempt = () => {
        const inputWord = grid[currentRow].join("").toUpperCase();

        if (inputWord === targetWord.toUpperCase()) {
            const score: Score = { name: 'Jugador', score: 100 }; 
            addScore(score); 
            Alert.alert("¡Felicidades!", "¡Has adivinado la palabra correctamente!", [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Score') 
                }
            ]);
            setCurrentRow(0);
            setGrid(grid.map(row => row.map(_ => "")));
            return;
        }

        if (currentRow === 5) {
            Alert.alert("¡Lo siento!", "¡Se acabaron los intentos! La palabra correcta era: " + targetWord);

            setCurrentRow(0);
            setGrid(grid.map(row => row.map(_ => ""))); 
            return;
        }

        setCurrentRow((prevRow) => prevRow + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Adivina la palabra!</Text>
            <View style={styles.grid}>
                {grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((letter, colIndex) => (
                            <TextInput
                                key={colIndex}
                                style={[styles.cell, { backgroundColor: getCellColor(letter, rowIndex, colIndex) }]}
                                value={letter}
                                onChangeText={(text) => handleLetterChange(text, rowIndex, colIndex)}
                                maxLength={1}
                                autoCapitalize="characters"
                                editable={rowIndex === currentRow}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <Button title="Intentar" onPress={handleAttempt} color="#B5EAD7" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#FFCCCC",
    },
    grid: {
        width: "100%", 
        flexDirection: "column", 
        alignItems: "center", 
    },
    row: {
        flexDirection: "row", 
        marginBottom: 10, 
    },
    cell: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 10, 
        textAlign: "center",
        margin: 2,
        fontWeight: "bold", 
    },
});

export default GameScreen;
