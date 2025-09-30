import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css'
export default function Index() {
  return (
    <SafeAreaView className=" bg-red-500 justify-center items-center ">
      <Text>hello world</Text>
    </SafeAreaView>
  );
}
