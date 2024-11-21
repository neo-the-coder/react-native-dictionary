import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ListItem = ({ words, showFav }) => {
  const {
    isFav,
    data: [
      {
        word,
        meanings: [
          {
            definitions: [{ definition }],
          },
        ],
      },
    ],
  } = words;
  return (
    <Link
      href={{
        pathname: "details",
        params: { searchedWord: word },
      }}
      push
      asChild
    >
      <TouchableOpacity style={styles.linkContainer}>
        <View style={styles.textContainer}>
          <View style={styles.wordContainer}>
            <Text style={styles.word} allowFontScaling={false} >{word}</Text>
            {showFav && isFav && (
              <FontAwesome name="star" style={styles.icon} />
            )}
          </View>

          <Text style={styles.definition} allowFontScaling={false}>
            {definition.slice(0, 50) + "..."}
          </Text>
        </View>

        <FontAwesome name="chevron-right" style={styles.icon} />
      </TouchableOpacity>
    </Link>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  linkContainer: {
    height: 60,
    backgroundColor: "#0b205710",
    borderColor: "#8e8e8e",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  textContainer: {
    flex: 1,
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  word: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 20,
  },
  definition: {
    fontSize: 14,
  },
  icon: {
    fontSize: 18,
    color: "#0b2057",
  },
});
