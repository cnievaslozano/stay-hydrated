import {
  getStoredConfig,
  storeConfig as storeConfigInStorage,
} from "./storage";

let config = {
  dailyGoal: 2000, // default
  glassCapacity: 250, // default
  streak: 0,
  totalWater: 0,
  lastGoalDate: null, // date of the last day that the goal was done
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

export const checkAndUpdateStreak = async () => {
  const today = new Date().toDateString();

  // If today's goal has already been done
  if (config.lastGoalDate === today) return;

  // If the water consumed today is enough to goal
  if (config.totalWater >= config.dailyGoal) {
    if (config.lastGoalDate) {
      const lastDate = new Date(config.lastGoalDate);
      const diffInTime = new Date(today).getTime() - lastDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (diffInDays === 1) {
        config.streak += 1; // Increase the streak if the previous day also done the goal
      } else {
        config.streak = 0; // Reset streak if you have skipped a day
      }
    } else {
      config.streak = 1; // Firts time goal done
    }

    config.lastGoalDate = today; // Update date
    await updateConfig(config);
  }
};
