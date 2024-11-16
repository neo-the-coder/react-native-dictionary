import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

const AdditionalText = ({ title, texts, uniqueKey }) => {
  return (
    <View style={styles.additionalsContainer}>
      <Text style={styles.additionalTitle}>{title}</Text>
      {texts.map((text, index) => (
        <Link
          key={`${uniqueKey}.${text}.${index}`}
          href={{
            pathname: "details",
            params: {searchedWord: text}
          }}
          push
          style={styles.additionalText}
        >
          {text}
        </Link>
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
