import React, { useRef, useState, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { getConfig } from "../config";

const iconBottle = require("../assets/bottle-water.png");

export const Bottle = () => {
  const [isPressable, setIsPressable] = useState(true);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [config, setConfig] = useState(getConfig());
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const configUpdateInterval = setInterval(() => {
      setConfig(getConfig());
    }, 1000);

    return () => clearInterval(configUpdateInterval);
  }, []);

  const increaseWater = () => {
    setIsPressable(false);
    setWaterConsumed(
      (prevWaterConsumed) => prevWaterConsumed + config.glassCapacity,
    );
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setIsPressable(true));
  };

  const decrementWater = () => {
    if (waterConsumed - config.glassCapacity <= 0) return setWaterConsumed(0);
    setWaterConsumed(
      (prevWaterConsumed) => prevWaterConsumed - config.glassCapacity,
    );
  };

  return (
    <>
      <Pressable onPress={isPressable ? increaseWater : null}>
        <Animated.Image
          source={iconBottle}
          style={[styles.image, { transform: [{ scale: scaleValue }] }]}
        />
      </Pressable>
      <Pressable onPress={decrementWater}>
        <Text style={styles.decrementButton}>- {config.glassCapacity} ml</Text>
      </Pressable>
      <Text style={styles.counterLiters}>
        Water consumed: {waterConsumed} ml
      </Text>
      <Text style={styles.goalWater}>Goal: {config.dailyGoal} ml</Text>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
  counterLiters: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  goalWater: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  decrementButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
