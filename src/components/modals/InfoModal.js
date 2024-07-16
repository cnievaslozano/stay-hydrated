import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { modalStyles } from "./modalStyles";

export const InfoModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalView}>
        <Text style={modalStyles.modalTitle}>Stay Hydrated</Text>
        <Text style={modalStyles.modalText}>
          Drinking enough water every day is crucial for many reasons: to
          regulate body temperature, keep joints lubricated, prevent infections,
          deliver nutrients to cells, and keep organs functioning properly.
          Being well-hydrated also improves sleep quality, cognition, and mood.
        </Text>
        <Text style={modalStyles.modalText}>
          The National Academies of Sciences, Engineering, and Medicine
          recommends a daily water intake of:
        </Text>
        <Text style={modalStyles.modalText}>
          - About 3.7 liters (or 13 cups) for men
          {"\n"}- About 2.7 liters (or 9 cups) for women
        </Text>
        <Text style={modalStyles.modalText}>
          Remember, you may need more water if you are physically active, in a
          hot climate, or pregnant/breastfeeding.
        </Text>
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
