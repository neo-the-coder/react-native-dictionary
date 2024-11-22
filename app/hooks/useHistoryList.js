import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupByHistory } from "../../utils/helpers";

const useHistoryList = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const cachedfetchHistory = useCallback(() => {
    async function fetchHistory() {
      setLoading(true)
      setError(null);
      try {
        const storedWordsJson = await AsyncStorage.getItem("words");
        const storedWords =
          storedWordsJson !== null ? JSON.parse(storedWordsJson) : [];
        const wordHistory = groupByHistory(storedWords);
        setHistory(wordHistory);
      } catch (error) {
        console.error("Failed to load history from AsyncStorage", error);
        setError("Failed to load history!");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  useFocusEffect(cachedfetchHistory);

  return { history, loading, error, retry: cachedfetchHistory };
};

export default useHistoryList;
