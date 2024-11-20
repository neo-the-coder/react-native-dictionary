import { useGlobalSearchParams } from "expo-router";
import { Stack } from "expo-router/stack";
import { SafeAreaView } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function Layout() {
  let { searchedWord = "word definition" } = useGlobalSearchParams();
  searchedWord = searchedWord[0].toUpperCase() + searchedWord.slice(1);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootSiblingParent>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="details"
            options={{
              title: searchedWord,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#efedff",
                borderBottomWidth: 1,
                borderBottomColor: "#8e8e8e",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                elevation: 3,
              },
            }}
          />
        </Stack>
      </RootSiblingParent>
    </SafeAreaView>
  );
}
