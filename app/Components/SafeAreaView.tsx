import { cn } from "@/utils/cn";
import React from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
type SafeAreaViewProps = {
  children: React.ReactNode;
  className?: string | undefined;
};
const SafeAreaView = ({ children, className }: SafeAreaViewProps) => {
  const isLight = useColorScheme() === "light" ? true : false;
  return (
    <RNSafeAreaView
      className={cn(isLight ? "bg-white" : "bg-gray-900", "flex-1", className)}
    >
      {children}
    </RNSafeAreaView>
  );
};

export default SafeAreaView;
