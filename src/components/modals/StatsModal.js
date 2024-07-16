import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { modalStyles } from "./modalStyles";

export const StatsModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalText}>Stats Modal</Text>
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
