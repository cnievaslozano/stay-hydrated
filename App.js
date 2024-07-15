import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Bottle } from "./components/Bottle";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>STAY HYDRATED!!</Text>

      <Bottle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    alignItems: "center",
    justifyContent: "center",
  },
});
