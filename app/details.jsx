import { useLocalSearchParams } from "expo-router";
import WordFetcher from "./components/WordFetcher";
import { View } from "react-native";

const WordDetailsScreen = () => {
  const { searchedWord } = useLocalSearchParams();
  return (
    <View style={{ paddingVertical: 15, backgroundColor: "#efedff" }}>
      <WordFetcher searchedWord={searchedWord} />
    </View>
  );
};

export default WordDetailsScreen;
