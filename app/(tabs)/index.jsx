import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import WordFetcher from "../components/WordFetcher";

const Search = () => {
  const [searchedWord, setSearchedWord] = useState("");
  const [inputText, setInputText] = useState("");

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (trimmed === "") return;
    setSearchedWord(trimmed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a word"
          placeholderTextColor="#443777"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {searchedWord && <WordFetcher searchedWord={searchedWord} />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#efedff",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    minWidth: 250,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#0b2057",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    flex: 1,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
    color: "#0b2057",
  },
  searchButton: {
    justifyContent: "center",
    backgroundColor: "#0b2057",
    marginLeft: 10,
    borderRadius: 5,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  },
  searchButtonText: {
    color: "#efedff",
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 20,
  },
});
