import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

const iconBottle = require("../assets/bottle-water.png");

export const Bottle = () => {
  const [isPressable, setIsPressable] = useState(true);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onHandlePress = () => {
    setIsPressable(false);
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setIsPressable(true));
  };

  return (
    <Pressable onPress={isPressable ? onHandlePress : null}>
      <Animated.Image
        source={iconBottle}
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
});
