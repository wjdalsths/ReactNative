import { StatusBar } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { theme } from "./color";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";

const STORAGE_KEY = "@toDos";
const STATUS_KEY = "@status";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    s && setToDos(JSON.parse(s));
  };

  const addTodo = async () => {
    if (text == "") return;
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, check: false },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete To Do", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };
  const onCheckToDos = async (key, state) => {
    const value = Object.values(state)[0];
    const status = Object.keys(state)[0];
    const newToDos = {
      ...toDos,
      [key]: {
        ...toDos[key],
        [status]: value,
      },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const setStatus = async () => {
    const s = await AsyncStorage.getItem(STATUS_KEY);
    setWorking(s == "true");
  };
  const saveStatus = async () => {
    try {
      await AsyncStorage.setItem(STATUS_KEY, String(working));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadToDos();
    setStatus();
  }, []);

  useEffect(() => {
    saveStatus();
  }, [working]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Works
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={addTodo}
        placeholder={
          working ? "What do you have to do?" : "Where do you want to go?"
        }
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) =>
          toDos[key].working === working ? (
            <View style={styles.toDos} key={key}>
              <View style={styles.toDosLeft}>
                <MaterialIcons
                  name={
                    toDos[key].check ? "check-box" : "check-box-outline-blank"
                  }
                  size={24}
                  color="white"
                  onPress={() =>
                    onCheckToDos(key, { check: !toDos[key].check })
                  }
                />
                <Text
                  style={{
                    ...styles.toDoText,
                    color: toDos[key].check ? theme.toDoBg : "#fff",
                    textDecorationLine: toDos[key].check && "line-through",
                  }}
                >
                  {toDos[key].text}
                </Text>
              </View>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Fontisto name="trash" size={18} color={theme.bg} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}
