// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function TabBarIcon({ style, ...rest }) {
  return (
    <FontAwesome5 size={24} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
