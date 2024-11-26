import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./Styles";
import logo from "../../assets/logo_quiz.png";

export default function Home({ navigation, route }) {
  return (
    <View style={styles.containerInicialPage}>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={[styles.titulo, styles.inputViewBottomVerticalTitulo]}>
        Quiz Game!
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
        <Text style={styles.buttonInicio}>Start Game!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Themes")}>
        <Text style={styles.buttonTema}>Themes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Questions")}>
        <Text style={styles.buttonQuestao}>Questions</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}
