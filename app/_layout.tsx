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
import * as Notifications from 'expo-notifications';

import { AuthContext, LoadingContext } from '@/context';
import { useColorScheme } from '@/components/useColorScheme';
import { User } from '@/types/user';
import i18n from "i18next";
import en from "@/locales/en/translation.json";
import bn from "@/locales/bn/translation.json";
import { socket } from '@/constants/socket';
import { queryKeys } from '@/constants';
import { refreshTokens } from '@/services/token';

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
    "inter": require('../assets/fonts/Inter-Regular.ttf'),
    'inter-sb': require('../assets/fonts/Inter-SemiBold.ttf'),
    'inter-b': require('../assets/fonts/Inter-Bold.ttf'),
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
      if (user) {
        const userObj: User = JSON.parse(user);
        const refreshedToken = await refreshTokens(userObj.refreshToken);
        if (refreshedToken) {
          userObj.accessToken = refreshedToken.accessToken;
          userObj.refreshToken = refreshedToken.refreshToken;
          SecureStore.setItemAsync("user", JSON.stringify(userObj));
        }
        setUser(userObj);
        socket.auth = {
          userID: userObj.ID,
          username:
            userObj.firstName && userObj.lastName
              ? `${userObj.firstName} ${userObj.lastName}`
              : `${userObj.email}`,
          accessToken: userObj.accessToken,
        };

        socket.connect();
      }
    }
    getUser().then(() => {
      socket.on(
        "getMessage",
        (data: {
          senderID: number;
          senderName: string;
          conversationID: number;
          text: string;
        }) => {
          queryClient.invalidateQueries(queryKeys.chats);
          queryClient.invalidateQueries(queryKeys.selectedChat);

          Notifications.scheduleNotificationAsync({
            content: {
              title: data.senderName,
              body: data.text,
              data: {
                // will need to change url in prod build (use process.ENV && eas.json)
                url: `exp://192.168.30.24:19000/--/messages/${data.conversationID}/${data.senderName}`,
              },
            },
            trigger: null,
          });
        }
      );
      socket.on("session", (data: { sessionID: string }) => {
        socket.auth = { sessionID: data.sessionID };
        if (user) {
          const updatedUser = { ...user };
          updatedUser.sessionID = data.sessionID;
          setUser(updatedUser);
          SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
        }
      });

      socket.on("connect_error", (err) => {
        if (err.message === "Invalid userID" && user) {
          socket.auth = {
            userID: user?.ID,
            username:
              user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : `${user.email}`,
          };
          socket.connect();
        }
      });
    });
    return () => {
      socket.off("getMesssage");
      socket.off("session");
      socket.off("connect_error");
    };
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
                  <Stack.Screen name="screens/SpecialistChat" options={{ presentation: 'modal', headerShown: false }} />
                  <Stack.Screen name="screens/MessageSpecialist" options={{ presentation: 'modal', headerShown: false }} />
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