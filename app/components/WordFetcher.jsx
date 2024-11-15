import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import Word from "./Word";

const WordFetcher = ({ searchedWord }) => {
  const [wordToSearch, setWordToSearch] = useState(searchedWord);
  const [words, setWords] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

  useEffect(() => {
    setWordToSearch(searchedWord);
  }, [searchedWord]);

  useEffect(() => {
    const fetchDefinition = async () => {
      const URL = API_URL + wordToSearch;
      try {
        setLoading(true);
        setError();
        const response = await fetch(URL);

        if (!response.ok) {
          throw Error(response.status);
        }

        const result = await response.json();
        setWords(result);
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

  return <Word words={words} setWordToSearch={setWordToSearch} />;
};

export default WordFetcher;

const styles = StyleSheet.create({
  error: {
    color: "red",
    backgroundColor: "#44377722",
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "bold",
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
