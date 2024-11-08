import { Tabs } from "expo-router";
import { TabBarIcon } from "./components/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="search"
      screenOptions={{
        tabBarActiveTintColor: "#e5e5e5",
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarActiveBackgroundColor: "#ecb61c",
        headerShown: false,
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
        name="search"
        options={{
          title: "Search",
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
