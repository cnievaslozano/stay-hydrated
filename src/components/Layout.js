import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Bottle } from "./Bottle";
import { Header } from "./Header";

export const Layout = () => {
  const [borderColor, setBorderColor] = useState("transparent");

  const flashBorderColor = (whatColor) => {
    if (whatColor) {
      setBorderColor("rgba(0, 0, 255, 0.3)");
    } else {
      setBorderColor("rgba(255, 0, 0, 0.3)");
    }

    // eslint-disable-next-line no-undef
    setTimeout(() => {
      setBorderColor("transparent");
    }, 500);
  };

  return (
    <View style={[styles.container, { borderColor }]}>
      <StatusBar style="auto" />
      <Header />
      <Bottle flashBorderColor={flashBorderColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ebe0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
    borderColor: "transparent",
  },
});
