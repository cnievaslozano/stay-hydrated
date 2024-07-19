import React, { useRef, useState, useEffect } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { Audio } from "expo-av";
import { updateConfig, getConfig } from "../config";

const iconBottle = require("../assets/bottle-water.png");
const increaseWaterSound = require("../assets/water-sound.mp3");
const decreaseWaterSound = require("../assets/decreaseWater-sound.mp3");

export const Bottle = ({ flashBorderColor }) => {
  // states
  const [isPressable, setIsPressable] = useState(true);
  const [waterConsumed, setWaterConsumed] = useState(0);
  const [config, setConfig] = useState(getConfig());
  const scaleValue = useRef(new Animated.Value(1)).current;
  const increaseSound = useRef(new Audio.Sound());
  const decreaseSound = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await increaseSound.current.loadAsync(increaseWaterSound);
        await decreaseSound.current.loadAsync(decreaseWaterSound);
      } catch (error) {
        console.log("Error loading sound: ", error);
      }
    };

    const unloadSound = async () => {
      try {
        await increaseSound.current.unloadAsync();
        await decreaseSound.current.unloadAsync();
      } catch (error) {
        console.log("Error unloading sound: ", error);
      }
    };

    const configUpdateInterval = setInterval(() => {
      setConfig(getConfig());
    }, 1000);

    loadSound();

    return () => {
      clearInterval(configUpdateInterval);
      unloadSound();
    };
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

    await playIncreaseSound();
    flashBorderColor(true);
  };

  const handleDecrementWater = async () => {
    await playDecreaseSound();
    flashBorderColor(false);

    if (waterConsumed - config.glassCapacity <= 0) return setWaterConsumed(0);

    const newWaterConsumed = waterConsumed - config.glassCapacity;
    setWaterConsumed(newWaterConsumed);

    // Update totalWater in config
    const newTotalWater = Math.max(0, config.totalWater - config.glassCapacity);
    await updateConfig({ totalWater: newTotalWater });
  };

  // play audio
  const playIncreaseSound = async () => {
    try {
      await increaseSound.current.replayAsync();
    } catch (error) {
      console.log("Error playing increase sound: ", error);
    }
  };

  const playDecreaseSound = async () => {
    try {
      await decreaseSound.current.replayAsync();
    } catch (error) {
      console.log("Error playing decrease sound: ", error);
    }
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
    width: 450,
    height: 450,
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
