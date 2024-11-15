import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AdditionalText = ({ title, texts, uniqueKey, setWordToSearch }) => {
  return (
    <View style={styles.additionalsContainer}>
      <Text style={styles.additionalTitle}>{title}</Text>
      {texts.map((text, index) => (
        <TouchableOpacity
          key={`${uniqueKey}.${text}.${index}`}
          onPress={() => setWordToSearch(text)}
        >
          <Text style={styles.additionalText}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AdditionalText;

const styles = StyleSheet.create({
  additionalsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 10,
  },
  additionalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  },
  additionalText: {
    backgroundColor: "#0b2057",
    color: "#efedff",
    fontSize: 18,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
});
