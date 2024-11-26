import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "./Styles";
import * as questionsDao from "../../services/questionsDAO";
import * as themesDao from "../../services/themesDAO";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Questions({ navigation, route }) {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswer1, setWrongAnswer1] = useState("");
  const [wrongAnswer2, setWrongAnswer2] = useState("");
  const [wrongAnswer3, setWrongAnswer3] = useState("");
  const [id, setId] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [themesMap, setThemesMap] = useState({});

  async function setup() {
    try {
      await questionsDao.createTable();
      await loadThemes();
      await loadData();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setup();
  }, []);

  async function loadThemes() {
    try {
      const dbThemes = await themesDao.getThemes();
      dbThemes.sort((a, b) => (a.name > b.name ? 1 : -1));
      setThemes(dbThemes);

      const themeMap = {};
      dbThemes.forEach((theme) => {
        themeMap[theme.id] = theme.name;
      });
      setThemesMap(themeMap);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function loadData() {
    try {
      const dbQuestions = await questionsDao.getQuestions();
      setQuestions(dbQuestions);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async function saveQuestion() {
    if (!selectedTheme) {
      Alert.alert("Error", "Please select a topic for the question.");
      return;
    }

    const isNew = id === undefined || id === 0;

    let obj = {
      id: isNew ? createUniqueId() : id,
      theme_id: selectedTheme,
      question_text: questionText.trim(),
      correct_answer: correctAnswer.trim(),
      wrong_answer_1: wrongAnswer1.trim(),
      wrong_answer_2: wrongAnswer2.trim(),
      wrong_answer_3: wrongAnswer3.trim(),
    };

    if (
      !obj.question_text ||
      !obj.correct_answer ||
      !obj.wrong_answer_1 ||
      !obj.wrong_answer_2 ||
      !obj.wrong_answer_3
    ) {
      Alert.alert("Error", "All fields must be completed.");
      return;
    }

    try {
      let response = false;
      if (isNew) {
        response = await questionsDao.insertQuestion(obj);
      } else {
        response = await questionsDao.updateQuestion(obj);
      }

      if (response) {
        Alert.alert("Sucess", "Question saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save question.");
      }

      cleanFields();
      await loadData();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  async function cleanFields() {
    setQuestionText("");
    setCorrectAnswer("");
    setWrongAnswer1("");
    setWrongAnswer2("");
    setWrongAnswer3("");
    setSelectedTheme("");
    setId(0);
    Keyboard.dismiss();
  }

  function editQuestion(id) {
    const selectedQuestion = questions.find((question) => question.id == id);
    if (selectedQuestion) {
      setId(selectedQuestion.id);
      setQuestionText(selectedQuestion.question_text);
      setCorrectAnswer(selectedQuestion.correct_answer);
      setWrongAnswer1(selectedQuestion.wrong_answer_1);
      setWrongAnswer2(selectedQuestion.wrong_answer_2);
      setWrongAnswer3(selectedQuestion.wrong_answer_3);
      setSelectedTheme(selectedQuestion.theme_id);
    }
  }

  function deleteQuestion(id) {
    Alert.alert("Attention!", "Do you want to delete this question?", [
      {
        text: "Yes",
        onPress: () => deleteQuestionAux(id),
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  }

  async function deleteQuestionAux(id) {
    try {
      await questionsDao.deleteQuestion(id);
      cleanFields();
      await loadData();
      Alert.alert("Question deleted successfully.");
    } catch (e) {
      Alert.alert("Error deleting question", e.message);
    }
  }

  return (
    <View style={styles.containerThirdPage}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.viewBottom}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icon name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.titleThirdPage}>Questions</Text>
          </View>
        </View>

        <Text style={styles.subTitleThirdPage}>Theme</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => setSelectedTheme(itemValue)}
          >
            <Picker.Item label="Select a topic" value="" />
            {themes.map((theme) => (
              <Picker.Item key={theme.id} label={theme.name} value={theme.id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.subTitleThirdPage}>Question Statement</Text>
        <TextInput
          style={styles.labelThird}
          value={questionText}
          onChangeText={(text) => setQuestionText(text)}
          keyboardType="default"
        />
        <Text style={styles.subTitleThirdPage}>Correct Answer</Text>
        <TextInput
          style={styles.labelThird}
          value={correctAnswer}
          onChangeText={(text) => setCorrectAnswer(text)}
          keyboardType="default"
        />
        <Text style={styles.subTitleThirdPage}>Incorrect Answers</Text>
        <TextInput
          style={styles.labelThird}
          value={wrongAnswer1}
          onChangeText={(text) => setWrongAnswer1(text)}
          keyboardType="default"
        />
        <TextInput
          style={styles.labelThird}
          value={wrongAnswer2}
          onChangeText={(text) => setWrongAnswer2(text)}
          keyboardType="default"
        />
        <TextInput
          style={styles.labelThird}
          value={wrongAnswer3}
          onChangeText={(text) => setWrongAnswer3(text)}
          keyboardType="default"
        />
        <View style={styles.centerButtons}>
          <TouchableOpacity
            style={styles.buttonInsertDataInicial}
            onPress={saveQuestion}
          >
            <Text style={styles.labelThirdButton}>Save Question</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonInsertDataInicial}
            onPress={cleanFields}
          >
            <Text style={styles.labelThirdButton}>Clear Fields</Text>
          </TouchableOpacity>
        </View>
        <View>
          {questions.map((question) => (
            <View key={question.id} style={styles.questionItem}>
              <Text style={styles.questionText}>
                {themesMap[question.theme_id] || "Unknown Topic"}
              </Text>
              <TouchableOpacity onPress={() => editQuestion(question.id)}>
                <Text style={styles.questionButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteQuestion(question.id)}>
                <Text style={styles.questionButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
