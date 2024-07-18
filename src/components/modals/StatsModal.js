import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { modalStyles } from "./modalStyles";
import { getConfig } from "../../config";

export const StatsModal = ({ isVisible, onClose }) => {
  const [streak, setStreak] = useState("");
  const [totalWater, setTotalWater] = useState("");

  // When component is rendered
  useEffect(() => {
    const loadStats = async () => {
      const config = getConfig();
      if (config) {
        setStreak(config.streak || "0");
        setTotalWater(config.totalWater || "0");
      }
    };

    if (isVisible) {
      loadStats();
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalTitle}>Stats </Text>

        {/* Streak and Total Water Stats */}
        <Text style={modalStyles.modalText}>Streak: {streak} days</Text>
        <Text style={modalStyles.modalText}>
          Total Water Consumed: {totalWater} ml
        </Text>

        {/* Close Button */}
        <Pressable
          style={[modalStyles.button, modalStyles.buttonClose]}
          onPress={onClose}
        >
          <Text style={modalStyles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
