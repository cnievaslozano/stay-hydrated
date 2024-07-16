import { Layout } from "./src/components/Layout";
import { Bottle } from "./src/components/Bottle";
import { loadConfig } from "./src/config";

export default function App() {
  loadConfig(); // asyncStorage load for configuration

  return (
    <Layout>
      <Bottle />
    </Layout>
  );
}
