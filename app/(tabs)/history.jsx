import { SectionList, StyleSheet, Text, View } from "react-native";
import {
  ErrorWithRetry,
  Loading,
  Notification,
} from "../components/FetchHandling";
import useHistoryList from "../hooks/useHistoryList";
import ListItem from "../components/ListItem";

const History = () => {
  const { history, loading, error, retry } = useHistoryList();

  if (loading) return <Loading />;

  if (error) return <ErrorWithRetry error={error} retry={retry} />;

  const text =
    "You don't have a search history.\nSearch some words and come back ;)";

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <SectionList
          sections={history}
          keyExtractor={({ data: [{ word }], history: [date] }) => word + date}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          renderItem={({ item }) => <ListItem words={item} showFav />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => (
            <View style={[styles.separator, { backgroundColor: "#efedff" }]} />
          )}
        />
      ) : (
        <Notification text={text} />
      )}
    </View>
  );
};

export default History;

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
  header: {
    backgroundColor: "#443777",
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});
