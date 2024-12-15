import { Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

export default function Index() {
  const { authorize, user, error, clearSession } = useAuth0();

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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user && <Text>Logged in as {user.name}</Text>}
      {user && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: "#4f83cc",
          }}
        >
          <Text
            onPress={onPressLogout}
            style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
          >
            Logout
          </Text>
        </View>
      )}
      {!user && (
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            backgroundColor: "#4f83cc",
          }}
        >
          <Text
            onPress={onPressLogin}
            style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
          >
            Login
          </Text>
        </View>
      )}
      {error && <Text>{error.message}</Text>}
    </View>
  );
}
