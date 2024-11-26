import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

export default function EndGame({
  navigation,
  correctCount,
  totalQuestions,
  onRestart,
}) {
  const percentage = (correctCount / totalQuestions) * 100;

  return (
    <View style={styles.containerGamePage}>
      <Text style={styles.tituloGamePage}>Final Summary:</Text>
      <Text style={styles.subTituloGamePage}>
        Congratulations!
      </Text>
      <Text style={styles.textGamePage}>
        You got {correctCount} out of {totalQuestions} question(s) right
      </Text>
      <Text style={styles.totalGamePage}>
        Total: {percentage.toFixed(0)}%
      </Text>
      <View styles={styles.viewRowButtons}>
        <TouchableOpacity
          onPress={onRestart}
          style={styles.buttonInsertDataInicial}
        >
          <Text style={styles.labelGameButton}>Play again!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.buttonInsertDataInicial}
        >
          <Text style={styles.labelGameButton}>Back to Home!</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
