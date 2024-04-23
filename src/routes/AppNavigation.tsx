import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GameScreen from "../views/GameScreen";
import HomeScreen from "../views/HomeScreen";
import ScoreSceen from "../views/ScoreScreen";



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Score" component={ScoreSceen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
