import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable, TextInput } from "react-native";
import { modalStyles } from "./modalStyles";
import { updateConfig, getConfig } from "../../config";

export const SettingsModal = ({ isVisible, onClose }) => {
  const [dailyGoal, setDailyGoal] = useState("");
  const [glassCapacity, setGlassCapacity] = useState("");

  useEffect(() => {
    const loadInitialConfig = async () => {
      const { dailyGoal, glassCapacity } = await getConfig();
      setDailyGoal(dailyGoal.toString());
      setGlassCapacity(glassCapacity.toString());
    };

    loadInitialConfig();
  }, []);

  const handleSave = async () => {
    await updateConfig({
      dailyGoal: parseInt(dailyGoal),
      glassCapacity: parseInt(glassCapacity),
    });
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalView}>
        {/* Title */}
        <Text style={modalStyles.modalTitle}>Settings</Text>

        {/* Input Daily Water Goal */}
        <Text style={modalStyles.modalText}>Daily Water Goal (ml)</Text>
        <TextInput
          style={modalStyles.input}
          placeholder="Enter daily water goal"
          keyboardType="numeric"
          value={dailyGoal}
          onChangeText={setDailyGoal}
        />

        {/* Input Glass Capacity */}
        <Text style={modalStyles.modalText}>Glass Capacity (ml)</Text>
        <TextInput
          style={modalStyles.input}
          placeholder="Enter glass capacity"
          keyboardType="numeric"
          value={glassCapacity}
          onChangeText={setGlassCapacity}
        />

        {/* Button Save Inputs */}
        <Pressable
          style={[modalStyles.button, modalStyles.buttonClose]}
          onPress={handleSave}
        >
          <Text style={modalStyles.textStyle}>Save</Text>
        </Pressable>

        {/* Button Close Modal */}
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
