import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const cachedfetchFavorites = useCallback(() => {
    async function fetchFavorites() {
      setError(null);
      try {
        const storedWordsJson = await AsyncStorage.getItem("words");
        const storedWords =
          storedWordsJson !== null ? JSON.parse(storedWordsJson) : [];
        const favoriteWords = storedWords
          .filter((word) => word.isFav)
          .sort((a, b) => b.history[0] - a.history[0]);
        setFavorites(favoriteWords);
      } catch (error) {
        console.error("Failed to load favorites from AsyncStorage", error);
        setError("Failed to load favorites!");
      } finally {
        setLoading(false);
      }
    }
    fetchFavorites();
  }, []);

  useFocusEffect(cachedfetchFavorites);

  return { favorites, loading, error, retry: cachedfetchFavorites };
};

export default useFavoritesList;
