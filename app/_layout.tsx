import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { theme } from "@/theme";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from '@/components/useColorScheme';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'tabs/HomeScreen',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ApplicationProvider {...eva} theme={theme}>
        <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="tabs" options={{ headerShown: false }} />
            <Stack.Screen name="screens/SearchResults" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="screens/FindJotno" options={{ presentation: 'modal', headerShown: false }} />
          </Stack>
        </ThemeProvider>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
