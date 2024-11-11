import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AdditionalText from "./AdditionalText";
import words from "../data.json";

const Word = () => {
  return (
    <ScrollView>
      {words.map((word, wordIndex, words) => {
        return (
          <View key={wordIndex} style={styles.container}>
            {word.meanings.map((meaning, index, meanings) => (
              <React.Fragment key={index}>
                <View style={styles.wordContainer}>
                  <Text style={styles.word}>{word.word}</Text>

                  {index === 0 && words.length > 1 && (
                    <Text style={styles.wordMeanings}>{`${wordIndex + 1} of ${
                      words.length
                    }`}</Text>
                  )}

                  <Text style={styles.partOfSpeech}>
                    {meaning.partOfSpeech}
                  </Text>
                </View>

                {index === 0 && (
                  <View style={styles.phoneticsContainer}>
                    {word.phonetics.map((phonetic, index) => (
                      <View style={styles.phoneticContainer} key={index}>
                        <Text style={styles.phoneticText}>{phonetic.text}</Text>
                        {/* input phonetic.audio url to a play function */}

                        <TouchableOpacity
                          style={styles.playButton}
                          onPress={() => {}}
                        >
                          <FontAwesome5
                            name="volume-up"
                            size={20}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}

                {meaning.synonyms.length > 0 && (
                  <AdditionalText title="Synonyms" texts={meaning.synonyms} />
                )}

                {meaning.antonyms.length > 0 && (
                  <AdditionalText title="Antonyms" texts={meaning.antonyms} />
                )}

                <View style={styles.definitionsContainer}>
                  {meaning.definitions.map((definition, index) => (
                    <View key={index}>
                      <Text style={styles.definition}>{`${index + 1}. ${
                        definition.definition
                      }`}</Text>

                      {definition.synonyms.length > 0 && (
                        <AdditionalText
                          title="Synonyms"
                          texts={definition.synonyms}
                        />
                      )}

                      {definition.antonyms.length > 0 && (
                        <AdditionalText
                          title="Antonyms"
                          texts={definition.antonyms}
                        />
                      )}
                    </View>
                  ))}
                </View>
                {index !== meanings.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
            {wordIndex !== words.length - 1 && <View style={[styles.divider, styles.wordDivider]} />}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Word;

const styles = StyleSheet.create({
  container: {},
  divider: {
    height: 10.8,
    marginHorizontal: 5,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  wordDivider: {
    height: 30,
    borderBottomWidth: 3,
    borderStyle: "dotted",
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    marginTop: 10,
  },
  word: {
    color: "#0b2057",
    fontSize: 24,
    fontWeight: "bold",
  },
  wordMeanings: {
    backgroundColor: "#68330a",
    color: "#e8c88f",
    fontSize: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  partOfSpeech: {
    fontStyle: "italic",
    fontSize: 22,
    fontWeight: "bold",
  },
  phoneticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 5,
  },
  phoneticContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  phoneticText: {
    fontSize: 18,
  },
  playButton: {
    marginHorizontal: 5,
  },
  definitionsContainer: {
    rowGap: 10,
    marginTop: 10,
  },
  definition: {
    fontSize: 18,
  },
});
