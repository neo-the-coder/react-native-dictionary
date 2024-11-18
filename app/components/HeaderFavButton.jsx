import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native";

export function HeaderFavButton({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome
        size={24}
        style={{ color: "#0b2057", paddingHorizontal: 20 }}
        name={name}
      />
    </TouchableOpacity>
  );
}
