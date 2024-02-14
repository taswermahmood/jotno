import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { theme } from "@/theme";
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme['color-primary-500'],
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/searchModal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <TabBarIcon
                    name="information"
                    color='pink'
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <TabBarIcon name="message-text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <TabBarIcon name="account" color={color} />,
        }}
      />
    </Tabs>
  );
}
