import { View, Text, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import Button from '@/components/Button';
import { router } from 'expo-router';

export default function Home() {
  const { user, clearSession } = useAuth0();

  const onPressLogout = async () => {
    try {
      await clearSession();
      router.replace('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.name}!</Text>
      <Text style={styles.subtitle}>You're now logged in</Text>
      <Button onPress={onPressLogout} title="Logout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});
