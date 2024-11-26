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
import * as themesDao from "../../services/themesDAO";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Themes({ navigation, route }) {
  const [themeName, setThemeName] = useState("");
  const [id, setId] = useState(0);
  const [themes, setThemes] = useState([]);

  async function setup() {
    try {
      await themesDao.createTable();
      await loadData();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setup();
  }, []);

  async function cleanFields() {
    setThemeName("");
    setId(undefined);
    Keyboard.dismiss();
  }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async function loadData() {
    try {
      const fetchedThemes = await themesDao.getThemes();
      fetchedThemes.sort((a, b) => (a.name > b.name ? 1 : -1));
      setThemes(fetchedThemes);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function saveTheme() {
    const isNew = id == undefined || id == 0;

    let obj = {
      id: isNew ? createUniqueId() : id,
      name: themeName.trim(),
    };

    if (!obj.name) {
      Alert.alert("Error", "Fill in the name of the theme.");
      return;
    }

    try {
      let response = false;
      if (isNew) {
        response = await themesDao.insertTheme(obj);
      } else {
        response = await themesDao.updateTheme(obj);
      }

      if (response) {
        Alert.alert("Sucess", "Theme saved successfully!");
      } else {
        Alert.alert("Error", "Failed to save theme.");
      }

      cleanFields();
      await loadData();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  }

  function deleteTheme(id) {
    Alert.alert("Attention!", "Do you want to delete this theme?", [
      {
        text: "Yes",
        onPress: () => deleteThemeAux(id),
      },
      {
        text: "No",
        style: "cancel",
      },
    ]);
  }

  async function deleteThemeAux(id) {
    try {
      await themesDao.deleteTheme(id);
      cleanFields();
      await loadData();
      Alert.alert("Theme deleted successfully.");
    } catch (e) {
      Alert.alert("Error deleting theme", e.message);
    }
  }

  function editTheme(id) {
    const selectedTheme = themes.find((theme) => theme.id == id);
    if (selectedTheme != undefined) {
      setId(selectedTheme.id);
      setThemeName(selectedTheme.name);
    }
  }

  return (
    <View style={styles.containerSecondPage}>
      <View style={styles.viewBottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.titleSecondPage}>Themes</Text>
        </View>
      </View>

      <Text
        style={[styles.subTitleSecondPage, styles.inputViewBottomVertical]}
      >
        Enter the theme name:
      </Text>
      <TextInput
        style={[styles.labelSecond, styles.buttonInsertDataCal]}
        value={themeName}
        onChangeText={(text) => setThemeName(text)}
        keyboardType="default"
      />

      <View style={styles.centerButtons}>
        <TouchableOpacity
          style={styles.buttonInsertDataInicial}
          onPress={saveTheme}
        >
          <Text style={styles.labelSecondButton}>Save Theme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonInsertDataInicial}
          onPress={cleanFields}
        >
          <Text style={styles.labelSecondButton}>Clear Fields</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {themes.map((theme) => (
          <View key={theme.id} style={styles.themeItem}>
            <Text style={styles.themeText}>{theme.name}</Text>
            <TouchableOpacity onPress={() => editTheme(theme.id)}>
              <Text style={styles.themeButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTheme(theme.id)}>
              <Text style={styles.themeButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}
