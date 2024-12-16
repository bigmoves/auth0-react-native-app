import { Text, View, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import Button from "@/components/Button";
import TypewriterText from "@/components/TypewriterText";
import { useState } from "react";

const backgroundColors = ["#38a169", "#66d9ef", "#bbdefb", "#e5e5ea"];

export default function Index() {
  const { authorize, user, error, clearSession } = useAuth0();
  const [colorIndex, setColorIndex] = useState(0);

  const onPressLogin = async () => {
    try {
      await authorize();
    } catch (e) {
      console.log(e);
    }
  };

  const onPressLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColors[colorIndex] },
      ]}
    >
      <View style={styles.textContainer}>
        <TypewriterText
          phrases={["Hello", "Welcome", "Let's go"]}
          style={styles.welcomeText}
          onComplete={() => {
            setColorIndex((prev) => (prev + 1) % backgroundColors.length);
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        {user && <Text>Logged in as {user.name}</Text>}
        {user && (
          <>
            <Button title="Logout" onPress={onPressLogout} />
          </>
        )}
        {!user && (
          <>
            <Button
              title="Sign up with email"
              onPress={onPressLogin}
              icon="envelope"
            />
            <Button variant="outline" title="Log in" onPress={onPressLogin} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textContainer: {
    flex: 5.5,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
    gap: 8,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  button: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "white",
  },
});
