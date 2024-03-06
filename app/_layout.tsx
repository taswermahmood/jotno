import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from "@/theme";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useEffect } from 'react';
import * as SecureStore from "expo-secure-store";
import { initReactI18next } from "react-i18next";

import { AuthContext, LoadingContext } from '@/context';
import { useColorScheme } from '@/components/useColorScheme';
import { User } from '@/types/user';
import i18n from "i18next";
import en from "@/locales/en/translation.json";
import bn from "@/locales/bn/translation.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {
      translation: en,
    },
    bn: {
      translation: bn,
    }
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    async function getUser() {
      const user = await SecureStore.getItemAsync("user");
      if (user) setUser(JSON.parse(user))
    }
    getUser();
  }, []);

  if (!loaded) return null;
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <QueryClientProvider client={queryClient}>
          <ApplicationProvider {...eva} theme={theme}>
            <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="tabs" options={{ headerShown: false }} />

                <Stack.Screen name="screens/SearchResults" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/FindJotno" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/SpecialistDetails" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/account/AccountInformation" options={{ presentation: 'modal', headerShown: false }} />

                <Stack.Screen name="screens/authentication/SignInScreen" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/authentication/SignUpScreen" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/authentication/ResetPasswordScreen" options={{ presentation: 'modal', headerShown: false }} />
                <Stack.Screen name="screens/authentication/ForgotPasswordScreen" options={{ presentation: 'modal', headerShown: false }} />
              </Stack>
            </ThemeProvider>
          </ApplicationProvider>
        </QueryClientProvider>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center"
  },
  lottie: {
    height: 120,
    width: 120
  },
})
