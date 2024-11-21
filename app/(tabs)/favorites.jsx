import { FlatList, StyleSheet, View } from "react-native";
import useFavoritesList from "../hooks/useFavoritesList.js";
import ListItem from "../components/ListItem.jsx";
import {
  ErrorWithRetry,
  Loading,
  Notification,
} from "../components/FetchHandling.jsx";

const Favorites = () => {
  const { favorites, loading, error, retry } = useFavoritesList();

  if (loading) return <Loading />;

  if (error) return <ErrorWithRetry error={error} retry={retry} />;

  const text = "You don't have any favorite word.\nAdd some and come back ;)";

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <ListItem words={item} />}
          keyExtractor={(item) => item.data[0].word}
          ItemSeparatorComponent={<View style={styles.separator}></View>}
        />
      ) : (
        <Notification text={text} />
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efedff",
    paddingVertical: 5,
  },
  separator: {
    backgroundColor: "transparent",
    height: 5,
  },
});
