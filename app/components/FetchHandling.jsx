import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} color="#0b2057" />
    </View>
  );
};

export const ErrorWithRetry = ({ error, retry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={retry}>
        <Text style={styles.retryButtonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Notification = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.notification}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#efedff",
    padding: 20,
    rowGap: 10,
  },
  error: {
    color: "red",
    backgroundColor: "#ff000022",
    fontSize: 20,
    lineHeight: 28,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0b2057",
    alignSelf: "center",
    borderRadius: 5,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  },
  retryButtonText: {
    color: "#efedff",
    fontSize: 20,
    lineHeight: 28,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  notification: {
    color: "#0b2057",
    backgroundColor: "#44377722",
    fontSize: 20,
    lineHeight: 28,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: "center",
    textAlign: "center",
  },
});
