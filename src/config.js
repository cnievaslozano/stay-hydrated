import {
  getStoredConfig,
  storeConfig as storeConfigInStorage,
} from "./storage";

let config = {
  dailyGoal: 2000, // default
  glassCapacity: 250, // default
  streak: 2,
  totalWater: 1000,
};

export const loadConfig = async () => {
  const storedConfig = await getStoredConfig();
  if (storedConfig) {
    config = { ...config, ...storedConfig };
  }
};

export const getConfig = () => config;

export const updateConfig = async (newConfig) => {
  config = { ...config, ...newConfig };
  await storeConfigInStorage(config);
};
