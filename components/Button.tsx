import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";

interface Props {
  title: string;
  icon?: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
  variant?: "solid" | "outline";
}

export default function Button({
  title,
  icon,
  onPress,
  variant = "solid",
}: Props) {
  const buttonStyle: ViewStyle[] = [
    styles.button,
    variant === "outline" && styles.buttonOutline,
  ].filter(Boolean) as ViewStyle[];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icon && (
        <FontAwesome name={icon} size={16} color="#fff" style={styles.icon} />
      )}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 12,
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#333",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
