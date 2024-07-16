import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export const Header = ({ onSettingsPress, onInfoPress, onStatsPress }) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.button} onPress={onInfoPress}>
        <Feather name="info" size={24} color="white" />
      </Pressable>

      <Pressable style={styles.button} onPress={onStatsPress}>
        <Feather name="bar-chart-2" size={24} color="white" />
      </Pressable>

      <Pressable style={styles.button} onPress={onSettingsPress}>
        <Feather name="settings" size={24} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px",
    gap: "10px",
  },
  button: {
    backgroundColor: "#9bc1bc",
    padding: 10,
    borderRadius: 20,
  },
});

export default Header;
