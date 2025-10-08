import Button from "@/Components/Button";
import Input from "@/Components/Input";
import SafeAreaView from "@/Components/SafeAreaView";
import Text from "@/Components/Text";
import React, { useState } from "react";
import { Image, View } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView className=" justify-center items-center">
      <View className=" w-[380px]  rounded-xl bg-red-100/20 items-center">
        <Image
          className="h-[40px] w-[40px] mt-5"
          source={require("../../assets/images/Logo.png")}
        />
        <Text className=" mt-5 text-4xl font-bold">Login</Text>
        <Text className=" mt-5 text-gray-300">
          Enter your email and password to login
        </Text>
        <Input
          placeholder="Enter your email Here"
          text={email}
          onChangeText={setEmail}
          className=" mx-[24px] w-[330px] mt-5"
        />
        <Input
          placeholder="Enter your password Here"
          text={password}
          onChangeText={setPassword}
          className=" mx-[24px] w-[330px] mt-5"
        />
        <Button className=" w-[330px] mt-5 mb-5">Login</Button>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
