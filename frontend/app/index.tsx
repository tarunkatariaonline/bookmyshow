import SafeAreaView from "@/Components/SafeAreaView";
import Text from "@/Components/Text";
import { useColorScheme } from "react-native";
import "../global.css";
export default function Index() {
  const isLight = useColorScheme() === "light" ? true : false;
  return (
    <SafeAreaView>
      <Text>hello world</Text>
    </SafeAreaView>
  );
}
