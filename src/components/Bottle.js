/* eslint-disable no-undef */
import React, { useRef, useState, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { updateConfig, getConfig } from "../config";

const iconBottle = require("../assets/bottle-water.png");

export const Bottle = () => {
  // states
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

  // handlers
  const handleIncreaseWater = async () => {
    setIsPressable(false);

    // Update totalWater in client
    const newWaterConsumed = waterConsumed + config.glassCapacity;
    setWaterConsumed(newWaterConsumed);

    // Update totalWater in config
    const newTotalWater = config.totalWater + config.glassCapacity;
    await updateConfig({ totalWater: newTotalWater });

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

  const handleDecrementWater = async () => {
    if (waterConsumed - config.glassCapacity <= 0) return setWaterConsumed(0);

    const newWaterConsumed = waterConsumed - config.glassCapacity;
    setWaterConsumed(newWaterConsumed);

    // Update totalWater in config
    const newTotalWater = Math.max(0, config.totalWater - config.glassCapacity);
    await updateConfig({ totalWater: newTotalWater });
  };

  return (
    <>
      <Pressable onPress={isPressable ? handleIncreaseWater : null}>
        <Animated.Image
          source={iconBottle}
          style={[styles.image, { transform: [{ scale: scaleValue }] }]}
        />
      </Pressable>
      <Pressable onPress={handleDecrementWater}>
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
