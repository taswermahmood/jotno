import { Button, Text } from '@ui-kitten/components';
import { Screen } from "@/components/Screen";
import { ScrollView, StyleSheet, View } from 'react-native';
import { BORDER_RADIUS, LISTMARGIN } from '@/constants';
import { Redirect, router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';


export default function AccountScreen() {
  const { user, logout } = useAuth()
  router
  return (
    <Screen>
      {user ? <ScrollView style={styles.container}>
        <View>
          <Button onPress={() => router.push("/screens/authentication/ResetPasswordScreen")} style={styles.button}>
            Reset Password
          </Button>
          <Button onPress={logout} style={styles.button}>
            Logout
          </Button>
        </View>
      </ScrollView> : null}
    </Screen>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: LISTMARGIN,
  },
  button: {
    marginBottom: 10,
    borderRadius: BORDER_RADIUS
  },
});
