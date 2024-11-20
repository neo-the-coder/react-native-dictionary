import AsyncStorage from "@react-native-async-storage/async-storage";

export const groupByHistory = (allWords) => {
  return Object.values(
    allWords.reduce((acc, word) => {
      word.history.forEach((date) => {
        if (!acc[date]) {
          acc[date] = { date, data: [] };
        }
        acc[date].data.push(word);
      });
      return acc;
    }, {})
  );
};

export const responseFiltering = (response) =>
  response.map(({ word, phonetics, meanings, sourceUrls }, index) => ({
    word,
    phonetics: phonetics.map(({ text, audio }) => ({ text, audio })),
    meanings,
    ...(index === 0 && { wiki: sourceUrls[0] }),
  }));

export const getToday = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("en-GB", options);
};

export const getWordFromStorage = async (wordToSearch) => {
  const storedWordsJson = await AsyncStorage.getItem("words");
  const storedWords =
    storedWordsJson !== null ? JSON.parse(storedWordsJson) : [];
  const currentWord = storedWords.find(
    (word) => word.data[0].word === wordToSearch
  );
  return [currentWord, storedWords];
};