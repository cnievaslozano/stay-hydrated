import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@config";

export const getStoredConfig = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error fetching stored config:", e);
    return null;
  }
};

export const storeConfig = async (config) => {
  try {
    const jsonValue = JSON.stringify(config);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    console.log("Config stored successfully:", config);
  } catch (e) {
    console.error("Error storing config:", e);
  }
};
