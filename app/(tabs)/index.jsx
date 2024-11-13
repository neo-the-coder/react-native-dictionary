import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import WordFetcher from "../components/WordFetcher";

const Search = () => {
  const [searchedWord, setSearchedWord] = useState('');
  const [inputText, setInputText] = useState('');

  const handleSearch = () => {
    const trimmed = inputText.trim()
    if (trimmed === '') return
    setSearchedWord(trimmed)
  }

  return (
    <ImageBackground
      source={require("../../assets/bg_paper.png")}
      style={styles.bgImage}
      resizeMode="stretch"
    >
      <View style={styles.container}>
        <Text style={styles.header}>Dictionary</Text>

        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a word"
            placeholderTextColor="#68330a"
            value={inputText}
            onChangeText={setInputText}
          />

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {searchedWord && <WordFetcher searchedWord={searchedWord} />}
      </View>
    </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff29'
  },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#0b2057'
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    minWidth: 250
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#0b2057',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 1,
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.5) inset',
    color: '#0b2057',
  },
  searchButton: {
    justifyContent: 'center',
    backgroundColor: '#0b2057',
    marginLeft: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#f4dfa8',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 20
  },
  bgImage: {
    width: "100%",
    height: "100%",
    flex: 1
  },
});
