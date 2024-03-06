import { Text } from '@ui-kitten/components';
import { Image, StyleSheet, View } from 'react-native';
import { useUser } from "@/hooks/useUser";
import { Redirect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';

import { Screen } from "@/components/Screen";
import { SignUpAndSignInButton } from '@/components/SignUpAndSignInButton';
import { theme } from '@/theme';
import { BORDER_RADIUS } from '@/constants';
import { ScreenView } from '@/components/ScreenView';
import { useNotifications } from '@/hooks/useNotifications';
import { useEffect } from 'react';


export default function SignUpSignIn() {
    const { t } = useTranslation();
    const { user } = useUser()
    const { registerForPushNotificationsAsync, handleNotificationResponse } = useNotifications();
    
    useEffect(() => {
        registerForPushNotificationsAsync();
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true,
            }),
        });
        const responseListener = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
        return () => {
            if (responseListener) Notifications.removeNotificationSubscription(responseListener);
        }
    }, []);

    return (<>
        {user ? <Redirect href="/tabs/HomeScreen" /> :
            <Screen style={styles.container} >
                <ScreenView>
                    <Image style={{ alignSelf: "center", width: 250, height: 200, margin: 50 }} source={require("@/assets/images/icon.png")} />
                    <View style={{ position: "absolute", top: "40%" }}>
                        <Text style={{ color: theme["color-primary-900"] }} category='h1'>{t("Find the care you deserve")}</Text>
                        <Text style={{ color: theme["color-primary-700"] }} appearance="hint" category='h5'>{t("Pet Care, Elderly Care, Teachers, Housekeeping")}</Text>
                    </View>
                </ScreenView>
                <View style={styles.buttonContainer}>
                    <SignUpAndSignInButton />
                </View>
            </Screen >
        }
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme["color-primary-500"],
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        borderTopEndRadius: BORDER_RADIUS,
        borderTopStartRadius: BORDER_RADIUS,
        width: "100%",
        height: "25%",
        justifyContent: "space-evenly"
    }
})


