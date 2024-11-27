import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Link } from "expo-router";

const About = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const open = () => setModalVisible(true);
  const close = () => setModalVisible(false);
  return (
    <>
      <TouchableOpacity onPress={open}>
        <FontAwesome5 name="info-circle" style={styles.infoIcon} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={close}
      >
        <Pressable onPress={close} style={styles.backDrop}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={close}>
                <FontAwesome5 name="times" size={20} color="black" />
              </TouchableOpacity>

              <Text style={styles.modalText}>
                {"Made with ❤️ by\nKamran Zeynalov"}
              </Text>

              <View style={styles.socialsContainer}>
                <Text style={styles.socialHeader}>Find me on</Text>

                <Link href="https://github.com/neo-the-coder">
                  <View style={styles.socialItemContainer}>
                    <FontAwesome5 name="github" size={18} color="#efedff" />
                    <Text style={styles.socialText}>neo-the-coder</Text>
                  </View>
                </Link>

                <Link href="https://gitlab.com/neo-the-coder">
                  <View style={styles.socialItemContainer}>
                    <FontAwesome5 name="gitlab" size={18} color="#fca326" />
                    <Text style={styles.socialText}>neo-the-coder</Text>
                  </View>
                </Link>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  infoIcon: {
    fontSize: 28,
    color: "#0b2057",
    paddingHorizontal: 20,
  },
  backDrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000088",
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "#efedff",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#443777",
    borderColor: "#0b2057",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: -2,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  socialsContainer: {
    marginTop: 10,
    rowGap: 5,
  },
  socialHeader: {
    textAlign: "center",
    fontSize: 18,
  },
  socialItemContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  socialText: {
    fontSize: 18,
    color: "#efedff",
  },
});
