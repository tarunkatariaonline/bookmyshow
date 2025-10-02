import SafeAreaView from "@/Components/SafeAreaView";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import "../global.css";
export default function Index() {
  const router = useRouter()

  useEffect(()=>{
    const isUser = true;
    console.log("User = ",isUser)
    const timer = setTimeout(()=>{
     router.replace('/(tabs)')
    },3000)
   return()=>{
      clearTimeout(timer)
   }
  },[])
  return (
    <SafeAreaView className="justify-center items-center">
     <Image
       className="h-20 w-20"
        source={require('../assets/images/Logo.png')}
      />
    </SafeAreaView>
  );
}
