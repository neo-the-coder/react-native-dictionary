import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import WordFetcher from "../components/WordFetcher";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "expo-router";

const Search = () => {
  const [searchedWord, setSearchedWord] = useState("");
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const navigation = useNavigation();

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (trimmed === "") return;
    setSearchedWord(trimmed);
  };

  const clearInput = () => {
    setInputText("");
    inputRef.current.focus();
  };

  useEffect(() => {
    searchedWord &&
      navigation.setOptions({
        headerLeft: () => (
          <Text style={styles.headerLeft}>Search</Text>
        ),
      });
  }, [searchedWord]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="search a word..."
            placeholderTextColor="#44377777"
            returnKeyType="search"
            ref={inputRef}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSearch}
            allowFontScaling={false}
          />

          {inputText && (
            <Pressable style={styles.clearButton} onPress={clearInput}>
              <FontAwesome5 name="times-circle" size={20} color="#0b2057" />
            </Pressable>
          )}
        </View>

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
    paddingVertical: 15,
    backgroundColor: "#efedff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    paddingHorizontal: 20,
    minWidth: 250,
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#0b2057",
    borderRadius: 5,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 45,
    fontSize: 18,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
    color: "#0b2057",
    backgroundColor: '#efedff',
    position: "relative",
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
  clearButton: {
    position: "absolute",
    right: 15,
    alignSelf: "flex-end",
    backgroundColor: '#efedff',
  },
  headerLeft: {
    fontWeight: 'semibold',
    fontSize: 18,
    paddingHorizontal: 20,
  },
});
