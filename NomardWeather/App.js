import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.weather}
      >
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
        <View style={style.day}>
          <Text style={style.temp}>27</Text>
          <Text style={style.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 58,
    fontWeight: 500,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 178,
  },
  description: { margin: -30, fontSize: 60 },
});
