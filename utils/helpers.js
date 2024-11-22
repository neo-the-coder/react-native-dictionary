import AsyncStorage from "@react-native-async-storage/async-storage";

export const groupByHistory = (allWords) => {
  return Object.values(
    allWords.reduce((acc, word) => {
      for (let date of word.history) {
        const dateStr = getDateStr(new Date(date));
        if (!acc[dateStr]) {
          acc[dateStr] = { title: dateStr, data: [word] };
          continue;
        }
        const recent = acc[dateStr].data[0].history[0];
        const position = date > recent ? "unshift" : "push";
        acc[dateStr].data[position](word);
      }
      return acc;
    }, {})
  ).sort((a, b) => Date.parse(b.title) - Date.parse(a.title));
};

export const responseFiltering = (response) =>
  response.map(({ word, phonetics, meanings, sourceUrls }, index) => ({
    word,
    phonetics: phonetics.map(({ text, audio }) => ({ text, audio })),
    meanings,
    ...(index === 0 && { wiki: sourceUrls[0] }),
  }));

export const getDateStr = (date) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
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
