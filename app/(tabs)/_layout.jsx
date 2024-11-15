import { Tabs } from "expo-router";
import { TabBarIcon } from "../components/TabBarIcon";
import { ImageBackground } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="initialRoute"
      initialRouteName="index"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#efedff",
          borderBottomColor: "#8e8e8e",
          borderBottomWidth: 1,
        },
        tabBarActiveTintColor: "#e5e5e5",
        tabBarActiveBackgroundColor: "#0b2057",
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarInactiveBackgroundColor: "#efedff",
        tabBarStyle: { borderTopColor: "#0b2057" },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Search Dictionary",
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </Tabs>
  );
}
