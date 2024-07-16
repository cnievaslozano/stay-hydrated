import {
  getStoredConfig,
  storeConfig as storeConfigInStorage,
} from "./storage";

let config = {
  dailyGoal: 2000, // default
  glassCapacity: 250, // default
};

export const loadConfig = async () => {
  const storedConfig = await getStoredConfig();
  if (storedConfig) {
    config = storedConfig;
  }
};

export const getConfig = () => config;

export const updateConfig = async (newConfig) => {
  config = { ...config, ...newConfig };
  await storeConfigInStorage(config);
};
