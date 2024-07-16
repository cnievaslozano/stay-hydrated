import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { InfoModal } from "./modals/InfoModal";
import { StatsModal } from "./modals/StatsModal";
import { SettingsModal } from "./modals/SettingsModal";

export const Header = () => {
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [isStatsModalVisible, setStatsModalVisible] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

  const handleInfoPress = () => {
    setInfoModalVisible(true);
  };

  const handleStatsPress = () => {
    setStatsModalVisible(true);
  };

  const handleSettingsPress = () => {
    setSettingsModalVisible(true);
  };

  return (
    <View style={styles.header}>
      {/* Buttons */}
      <Pressable style={styles.button} onPress={handleInfoPress}>
        <Feather name="info" size={24} color="white" />
      </Pressable>

      <Pressable style={styles.button} onPress={handleStatsPress}>
        <Feather name="bar-chart-2" size={24} color="white" />
      </Pressable>

      <Pressable style={styles.button} onPress={handleSettingsPress}>
        <Feather name="settings" size={24} color="white" />
      </Pressable>

      {/* Modals */}
      <InfoModal
        isVisible={isInfoModalVisible}
        onClose={() => setInfoModalVisible(false)}
      />

      <StatsModal
        isVisible={isStatsModalVisible}
        onClose={() => setStatsModalVisible(false)}
      />

      <SettingsModal
        isVisible={isSettingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  button: {
    backgroundColor: "#9bc1bc",
    padding: 10,
    borderRadius: 20,
  },
});
