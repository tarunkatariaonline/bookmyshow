import { Tabs } from "expo-router";
import React from "react";
import Icoicons from "react-native-vector-icons/Ionicons";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {},
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icoicons name="home" size={24} /> // 👈 smaller icon
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icoicons name="search" size={24} /> // 👈 smaller icon
          ),
        }}
      />
      <Tabs.Screen
        name="Tickets"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icoicons name="ticket" size={24} /> // 👈 smaller icon
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
