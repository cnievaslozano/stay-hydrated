import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "./Header";
import {
  handleSettingsPress,
  handleInfoPress,
  handleStatsPress,
} from "../utils/handlers";

export const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header
        onInfoPress={handleInfoPress}
        onStatsPress={handleStatsPress}
        onSettingsPress={handleSettingsPress}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ebe0",
    alignItems: "center",
    justifyContent: "center",
  },
});
