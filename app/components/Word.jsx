import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AdditionalText from "./AdditionalText";
import { Audio } from "expo-av";

const Word = ({ words }) => {
  const [sound, setSound] = useState();
  const [error, setError] = useState();
  const [isSoundLoading, setIsSoundLoading] = useState({});

  const pronounce = async (uri) => {
    setIsSoundLoading((prev) => ({ ...prev, [uri]: true }));
    setError(null);
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      setError(error);
      console.log("Error occured:", error);
    } finally {
      setIsSoundLoading((prev) => ({ ...prev, [uri]: false }));
    }
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <ScrollView>
      {words.map((word, wordIndex, words) => {
        return (
          <View key={wordIndex} style={styles.container}>
            {word.meanings.map((meaning, index, meanings) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    styles.wordContainer,
                    index === 0 && words.length > 1 ? styles.addMargin : null,
                  ]}
                >
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
                  <>
                    <View style={styles.phoneticsContainer}>
                      {word.phonetics.map((phonetic, index) => (
                        <View style={styles.phoneticContainer} key={index}>
                          <Text style={styles.phoneticText}>
                            {phonetic.text}
                          </Text>
                          {!isSoundLoading[phonetic.audio] ? (
                            <TouchableOpacity
                              style={styles.playButton}
                              onPress={() => pronounce(phonetic.audio)}
                            >
                              <FontAwesome5
                                name="volume-up"
                                size={20}
                                color="black"
                              />
                            </TouchableOpacity>
                          ) : (
                            <ActivityIndicator size={20} color="#0b2057" />
                          )}
                        </View>
                      ))}
                    </View>

                    {word.phonetics.length > 0 && error && (
                      <Text style={styles.error}>
                        Sound could not be loaded. Please try again later.
                      </Text>
                    )}
                  </>
                )}

                {meaning.synonyms.length > 0 && (
                  <AdditionalText
                    title="Synonyms"
                    texts={meaning.synonyms}
                    uniqueKey={word.word + index}
                  />
                )}

                {meaning.antonyms.length > 0 && (
                  <AdditionalText
                    title="Antonyms"
                    texts={meaning.antonyms}
                    uniqueKey={word.word + index}
                  />
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
                          uniqueKey={index}
                        />
                      )}

                      {definition.antonyms.length > 0 && (
                        <AdditionalText
                          title="Antonyms"
                          texts={definition.antonyms}
                          uniqueKey={index}
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
            {wordIndex !== words.length - 1 && (
              <View style={[styles.divider, styles.wordDivider]} />
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Word;

const styles = StyleSheet.create({
  container: {},
  error: {
    color: "red",
    backgroundColor: "#44377722",
    fontWeight: "bold",
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginTop: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
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
  addMargin: {
    marginTop: 20,
  },
  word: {
    color: "#0b2057",
    fontSize: 24,
    fontWeight: "bold",
  },
  wordMeanings: {
    backgroundColor: "#443777",
    color: "#efedff",
    fontSize: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
