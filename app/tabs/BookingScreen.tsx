import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from '@/theme';
import { Screen } from "@/components/Screen";
import { useBookingQuery } from '@/hooks/queries/useBookingQuery';
import { useUser } from '@/hooks/useUser';
import { Loading } from '@/components/Loading';
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS, LISTMARGIN } from '@/constants';
import { BookingCard } from '@/components/BookingCard';


export default function BookingScreen() {
    const { t } = useTranslation();
    const Tab = createMaterialTopTabNavigator();
    const { user } = useUser()

    const bookings = useBookingQuery(user?.ID);
    if (bookings.isFetching) return <Loading />

    const Pending = () => {
        return (
            <Screen>
                <BookingCard
                    bookings={bookings.data?.pending}
                    cancel={true}
                    title='No pending booking found'
                    subHeader='Your pending booking will show up here once you book a specialist.'
                />
            </Screen>
        );
    }

    const Active = () => {
        return (
            <Screen>
                <BookingCard
                    bookings={bookings.data?.active}
                    bills={true}
                    title='No active booking found'
                    subHeader='Your active booking will show up here once a specialist accepts your booking.'
                />
            </Screen>
        );
    }


    const Completed = () => {
        return (
            <Screen>
                <BookingCard
                    bookings={bookings.data?.completed}
                    title="No completed booking found"
                    subHeader="Your completed booking will show up here once a job finishes."
                />
            </Screen>
        );
    }

    return (
        <Screen>
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={{ tabBarActiveTintColor: theme['color-primary-500'], tabBarPressColor: theme['color-gray'] }}>
                    <Tab.Screen name={t("Active")} component={Active} />
                    <Tab.Screen name={t("Pending")} component={Pending} />
                    <Tab.Screen name={t("Completed")} component={Completed} />
                </Tab.Navigator>
            </NavigationContainer>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </Screen >
    );
}

const styles = StyleSheet.create({
});