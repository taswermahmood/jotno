import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";
import * as Notifications from 'expo-notifications';

import { AuthContext } from "@/context";
import { socket } from "../constants/socket";
import { User, UserUpdate } from "@/types/user";
import { alterAllowsNotifications, alterPushToken, updateInformation } from "@/services/user";

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const setAndStoreUser = (user: User) => {
        let userString = JSON.stringify(user);
        setUser(user);
        SecureStore.setItemAsync("user", userString);
    }

    const login = (user: User) => {
        setAndStoreUser(user);
        socket.auth = {
            userID: user.ID,
            username:
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : `${user.email}`,
        };
        socket.connect();
        queryClient.refetchQueries();
    }

    const logout = async () => {
        if (user) {
            const prevUser = { ...user };
            setUser(null);
            SecureStore.deleteItemAsync("user");
            socket.disconnect();
            queryClient.clear();
            try {
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                if (token)
                    await alterPushToken(user?.ID, "add", token, user.accessToken);
            } catch (error) {
                setAndStoreUser(prevUser);
            }
        }
    }

    const setFavoritedSpecialists = (favoritedSpecialists: number[]) => {
        if (user) {
            const newUser = { ...user };
            newUser.favorited = favoritedSpecialists;
            setAndStoreUser(user);
        }
    }

    const addPushToken = async (token: string) => {
        if (user) {
            const updatedUser = { ...user };
            const prevUser = { ...user };

            updatedUser.pushToken = token;

            setAndStoreUser(updatedUser);

            try {
                await alterPushToken(user.ID, "add", token, user.accessToken);
            } catch (error) {
                setAndStoreUser(prevUser);
            }
        }
    };

    const setAllowsNotifications = async (allowed: boolean) => {
        if (user) {
            const updatedUser = { ...user };
            const prevUser = { ...user };
            updatedUser.allowsNotifications = allowed;
            setAndStoreUser(updatedUser);

            try {
                await alterAllowsNotifications(user.ID, allowed, user.accessToken);
            } catch (error) {
                setAndStoreUser(prevUser);
            }
        }
    };

    const updateUserInfo = async (updateInfo: UserUpdate) => {
        if (user) {
            const updatedUser = { ...user };
            const prevUser = { ...user };
            if (updateInfo.firstName) updatedUser.firstName = updateInfo.firstName;
            if (updateInfo.lastName) updatedUser.lastName = updateInfo.lastName;
            if (updateInfo.email) updatedUser.email = updateInfo.email;
            if (updateInfo.address) updatedUser.address = updateInfo.address;
            if (updateInfo.city) updatedUser.city = updateInfo.city;
            if (updateInfo.lat) updatedUser.lat = updateInfo.lat;
            if (updateInfo.lon) updatedUser.lon = updateInfo.lon;
            setAndStoreUser(updatedUser);
            try {
                await updateInformation(user.ID, updateInfo, user.accessToken);
            } catch (error) {
                setAndStoreUser(prevUser);
            }
        };
    }

    return { user, setUser, login, logout, setFavoritedSpecialists, addPushToken, setAllowsNotifications, updateUserInfo }
}