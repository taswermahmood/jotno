import { useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { useQueryClient } from "react-query";
import * as Notifications from 'expo-notifications';

import { AuthContext } from "@/context";
import { User } from "@/types/user";
import { alterAllowsNotifications, alterPushToken } from "@/services/user";

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
        queryClient.refetchQueries();
    }

    const logout = async () => {
        if (user) {
            setUser(null);
            SecureStore.deleteItemAsync("user");
            queryClient.clear();
            try {
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                if (token)
                    await alterPushToken(user?.ID, "add", token);
            } catch (error) {}
        }
    }

    const setFavoritedSpecialists = (favoritedSpecialists: number[]) => {
        if (user) {
            const newUser = { ...user };
            newUser.favorites = favoritedSpecialists;
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
                await alterPushToken(user.ID, "add", token);
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
                await alterAllowsNotifications(user.ID, allowed);
            } catch (error) {
                setAndStoreUser(prevUser);
            }
        }
    };

    return { user, setUser, login, logout, setFavoritedSpecialists, addPushToken, setAllowsNotifications }
}