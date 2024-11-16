import { useLocalSearchParams } from "expo-router";
import WordFetcher from "./components/WordFetcher";
import { View } from "react-native";

const WordDetailsScreen = () => {
  const { searchedWord } = useLocalSearchParams();
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <WordFetcher searchedWord={searchedWord} />
    </View>
  );
};

export default WordDetailsScreen;
