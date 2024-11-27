import { Tabs } from "expo-router";
import { TabBarIcon } from "../components/TabBarIcon";
import About from "../components/About";

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
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          elevation: 3,
        },
        tabBarActiveTintColor: "#e5e5e5",
        tabBarActiveBackgroundColor: "#0b2057",
        tabBarInactiveTintColor: "#8e8e8e",
        tabBarInactiveBackgroundColor: "#efedff",
        tabBarStyle: { borderTopColor: "#0b2057" },
        tabBarAllowFontScaling : false,
        tabBarLabelPosition: "beside-icon"
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
          title: "🇬🇧 DICTIONARY",
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
          headerLeft: () => <About />
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
