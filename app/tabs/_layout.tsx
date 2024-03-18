import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useUser } from '@/hooks/useUser';
import { theme } from "@/theme";
import { Image } from 'react-native';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={26} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { user } = useUser()
  if (!user) return <Redirect href="/" />;

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontFamily: "inter-sb" },
        tabBarActiveTintColor: theme['color-primary-500'],
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          headerTitle: "",
          headerStatusBarHeight: 40,
          headerTitleStyle: { fontSize: 24 },
          headerLeft: () => (<Image style={{ height: 150, width: 100 }} source={require("@/assets/images/adaptive-icon.png")} />),
          tabBarIcon: ({ color }) => <TabBarIcon name="home-variant" color={color} />
        }}
      />
      <Tabs.Screen
        name="InboxScreen"
        options={{
          title: 'Inbox',
          headerStatusBarHeight: 40,
          headerTitleStyle: { fontSize: 24 },
          tabBarIcon: ({ color }) => <TabBarIcon name="text-box" color={color} />,
        }}
      />
      <Tabs.Screen
        name="BookingScreen"
        options={{
          title: 'Booking',
          headerStatusBarHeight: 40,
          headerTitleStyle: { fontSize: 24 },
          tabBarIcon: ({ color }) => <TabBarIcon name="book-variant" color={color} />,
        }}
      />
      <Tabs.Screen
        name="JobsScreen"
        options={{
          title: 'Jobs',
          headerStatusBarHeight: 40,
          headerTitleStyle: { fontSize: 24 },
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="AccountScreen"
        options={{
          title: 'Account',
          headerTitle: user.firstName + " " + user.lastName,
          headerTitleStyle: { fontSize: 28 },
          headerStatusBarHeight: 60,
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}