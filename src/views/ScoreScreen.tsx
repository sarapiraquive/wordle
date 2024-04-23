import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useGame, Score } from '../context/GameContext'; 

const ScoreScreen: React.FC = () => {
    const { getGame } = useGame(); 
    const [totalScore, setTotalScore] = useState<number>(0); 

    useEffect(() => {
        const fetchScores = async () => {
            const scores = await getGame();
            const newTotalScore = scores.reduce((acc, curr) => acc + curr.score, 0);
            setTotalScore(newTotalScore);
        };
        fetchScores();
    }, [getGame]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Puntuación total</Text>
            <Text style={styles.totalScore}>{totalScore} puntos</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    totalScore: {
        fontSize: 18,
    },
});

export default ScoreScreen;
