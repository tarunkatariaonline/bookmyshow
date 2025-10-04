import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#111827",
          height: 85,
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          height: 55,
          width: 55,
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "white" : "white"} // icon color always white
              style={{
                backgroundColor: focused ? "#F84565" : "transparent", // background only when focused
                padding: focused ? 15 : 0, // optional: add padding when focused
                borderRadius: focused ? 100 : 0, // rounded background
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="search"
              size={24}
              color="white"
              style={{
                backgroundColor: focused ? "#F84565" : "transparent",
                padding: focused ? 15 : 0,
                borderRadius: focused ? 100 : 0,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Tickets"
        options={{
          title: "Tickets",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="ticket"
              size={24}
              color="white"
              style={{
                backgroundColor: focused ? "#F84565" : "transparent",
                padding: focused ? 15 : 0,
                borderRadius: focused ? 100 : 0,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
