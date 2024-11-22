import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import WordFetcher from "../components/WordFetcher";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "expo-router";

const Search = () => {
  const [searchedWord, setSearchedWord] = useState("");
  const [inputText, setInputText] = useState("");

  const navigation = useNavigation();

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (trimmed === "") return;
    setSearchedWord(trimmed);
  };

  const clearInput = () => setInputText("");

  useEffect(() => {
    searchedWord &&
      navigation.setOptions({
        headerLeft: () => (
          <Text style={styles.headerLeft}>Search Dictionary</Text>
        ),
      });
  }, [searchedWord]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a word"
            placeholderTextColor="#443777"
            returnKeyType="search"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSearch}
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#efedff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10,
    minWidth: 250,
  },
  searchInputContainer: {
    flex: 1,
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
    alignSelf: "center",
    position: "absolute",
    right: 15,
    top: "50%",
    transform: "translateY(-50%)",
  },
  headerLeft: {
    fontWeight: 500,
    fontSize: 18,
    paddingHorizontal: 20,
  },
});
