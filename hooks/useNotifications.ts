import { Alert, Linking, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useUser } from './useUser';
import { openSettings } from "expo-linking";

export const useNotifications = () => {
    const { addPushToken, setAllowsNotifications, user } = useUser();
    const registerForPushNotificationsAsync = async (alertUser?: boolean) => {
        if (!user) return;
        let token;
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (!Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                if (alertUser)
                    Alert.alert(
                        "Error",
                        "To enable Push Notifications please change your settings.",
                        [
                            { text: "OK" }, { text: "Open Settings",  onPress: openSettings },
                        ] 
                    );
                if (user.allowsNotifications) 
                    setAllowsNotifications(false);
                throw new Error("User doesn't allow for notifications");
            }
            token = await Notifications.getExpoPushTokenAsync({ projectId: Constants?.expoConfig?.extra?.eas.projectId });
            addPushToken(token.data);
            if (!user.allowsNotifications) setAllowsNotifications(true);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token?.data;
    }

    const handleNotification = (notification: Notifications.Notification) => { };

    const handleNotificationResponse = (response: Notifications.NotificationResponse
    ) => {
        const data: { url?: string } = response.notification.request.content.data;
        if (data?.url) Linking.openURL(data.url);
    };

    return { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse };
}