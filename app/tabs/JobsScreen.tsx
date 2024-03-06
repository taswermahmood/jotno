import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '@/theme';

import { Screen } from "@/components/Screen";
import { NavigationContainer } from '@react-navigation/native';
import { JobPosts } from '@/app/screens/JobPosts';
import { FavoritedSpecialists } from '../screens/FavoritedSpecialists';


export default function JobsScreen() {
  const { t } = useTranslation();
  const Tab = createMaterialTopTabNavigator();

  return (
    <Screen>
      <NavigationContainer independent={true}>
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: theme['color-primary-500'], tabBarPressColor: theme['color-gray']}}>
          <Tab.Screen name={t("Posted Jobs")} component={JobPosts} />
          <Tab.Screen name={t("Favorites")} component={FavoritedSpecialists} />
        </Tab.Navigator>
      </NavigationContainer>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Screen >
  );
}

const styles = StyleSheet.create({
});