import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import Word from "./Word";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getDateStr,
  getWordFromStorage,
  responseFiltering,
} from "../../utils/helpers";
import { useNavigation } from "expo-router";
import { HeaderFavButton } from "./HeaderFavButton";
import Toast from "react-native-root-toast";

const WordFetcher = ({ searchedWord }) => {
  const [wordToSearch, setWordToSearch] = useState(searchedWord);
  const [words, setWords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    setWordToSearch(searchedWord);
  }, [searchedWord]);

  useEffect(() => {
    const handleFav = async (words) => {
      const {
        data: [{ word }],
        isFav,
      } = words;
      const toastOptions = {
        duration: 1000,
        position: Toast.positions.BOTTOM,
        delay: 0,
        shadow: true,
        animation: true,
        hideOnPress: true,
        backgroundColor: "#443777",
        textColor: "#efedff",
        opacity: 1,
      };
      let toastMsg = isFav
        ? `"${word}" removed from Favorites!`
        : `"${word}" added to Favorites!`;

      try {
        let [currentWord, allWords] = await getWordFromStorage(word);
        currentWord.isFav = !currentWord.isFav;
        await AsyncStorage.setItem("words", JSON.stringify(allWords));
        setWords((words) => ({ ...words, isFav: !words.isFav }));
      } catch (error) {
        console.error(error);
        toastMsg = isFav
          ? `Failed to remove "${word}" from Favorites!`
          : `Failed to add "${word}" to Favorites!`;
        toastOptions.backgroundColor = "#8c4040";
      } finally {
        Toast.show(toastMsg, toastOptions);
      }
    };

    navigation.setOptions({
      headerTitle: (loading || error) ? '' : words?.data?.[0].word,
      headerTitleStyle: {
        textTransform: "capitalize",
      },
      headerRight: () =>
        !loading &&
        !error && (
          <HeaderFavButton
            name={words?.isFav ? "star" : "star-o"}
            onPress={() => handleFav(words)}
          />
        ),
    });
  }, [navigation, words, loading, error]);

  useEffect(() => {
    const fetchDefinition = async () => {
      setLoading(true)
      setError();
      try {
        const now = new Date()
        // Try to get the word from the storage first
        let [currentWord, allWords] = await getWordFromStorage(wordToSearch);
        if (currentWord) {
          const { data, isFav, history } = currentWord;
          const todayStr = getDateStr(now);
          const index = history.findIndex(date => getDateStr(new Date(date)) === todayStr);
          // Add timestamp to the history if missing
          if (index === -1) history.unshift(now.getTime())
          // replace otherwise
          else history[index] = now.getTime()
          await AsyncStorage.setItem("words", JSON.stringify(allWords));
          setWords({ data, isFav });
          return;
        }
        // If word not found in the storage, fetch from api
        const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
        const URL = API_URL + wordToSearch;
        const response = await fetch(URL);

        if (!response.ok) {
          throw Error(response.statusText);
        }

        let data = await response.json();
        data = responseFiltering(data);
        // Save response to storage
        const newWord = {
          data,
          isFav: false,
          history: [now.getTime()],
        };
        await AsyncStorage.setItem(
          "words",
          JSON.stringify([newWord, ...allWords])
        );
        setWords({ data, isFav: false });
      } catch (error) {
        console.error(error);
        setError("No definitions found.\nPlease try a different word.");
      } finally {
        setLoading(false);
      }
    };

    fetchDefinition();
  }, [wordToSearch]);

  if (loading)
    return (
      <ActivityIndicator size={30} color="#0b2057" style={styles.loading} />
    );

  if (error) return <Text style={styles.error}>{error}</Text>;

  return <Word words={words.data} />;
};

export default WordFetcher;

const styles = StyleSheet.create({
  error: {
    color: "red",
    backgroundColor: "#44377722",
    fontSize: 20,
    lineHeight: 28,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
    textAlign: "center",
  },
  loading: {
    marginTop: 30,
  },
});
