import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import Word from "./Word";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getToday,
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
        console.log(error);
        toastMsg = isFav
          ? `Failed to remove "${word}" from Favorites!`
          : `Failed to add "${word}" to Favorites!`;
        toastOptions.backgroundColor = "#8c4040";
      } finally {
        Toast.show(toastMsg, toastOptions);
      }
    };

    navigation.setOptions({
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
      setLoading(true);
      setError();
      try {
        const today = getToday();
        // Try to get the word from the storage first
        let [currentWord, allWords] = await getWordFromStorage(wordToSearch);
        if (currentWord) {
          const { data, isFav, history } = currentWord;
          // Add today to the history if missing
          if (!history.includes(today)) {
            history.unshift(today);
            await AsyncStorage.setItem("words", JSON.stringify(allWords));
          }
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
          history: [today],
        };
        await AsyncStorage.setItem(
          "words",
          JSON.stringify([...allWords, newWord])
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
