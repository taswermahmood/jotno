import axios from "axios";

import { endpoints } from "@/constants";
import { User, UserUpdate } from "@/types/user";
import { handleError } from "@/utils/handleError";

type UserData = { data: User }

export const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.register, {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        })
        return data;
    } catch (error) {
        handleError(error)
    }
};

export const loginUser = async (
    email: string,
    password: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.login, {
            email,
            password
        })
        return data;
    } catch (error) {
        handleError(error)
    }
};

export const facebookLoginRegister = async (
    accessToken: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.facebook, {
            accessToken,
        })
        return data;
    } catch (error) {
        handleError(error)
    }
};

export const googleLoginRegister = async (
    accessToken: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.google, {
            accessToken,
        })
        return data;
    } catch (error) {
        handleError(error)
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const { data } = await axios.post(endpoints.forgotPassword, { email });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const resetPassword = async (password: string, token: string | string[]) => {
    try {
        const { data } = await axios.post(
            endpoints.resetPassword,
            { password },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return data;
    } catch (error: any) {
        if (error.response.status === 401) return alert("Invalid or Expired Token.")
        alert("Unable to reset password at this time.")
    }
}


export const updateInformation = (
    userID: number,
    userUpdate: UserUpdate,
    accessToken: string
) =>
    axios.patch(
        endpoints.updateUserInformation(userID),
        {
            firstName: userUpdate.firstName,
            lastName: userUpdate.lastName,
            email: userUpdate.email,
            avatar: userUpdate.avatar,
            address: userUpdate.address,
            lat: userUpdate.lat,
            lon: userUpdate.lon,
            city: userUpdate.city,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

export const alterPushToken = (
    userID: number,
    op: "add" | "remove",
    pushToken: string,
    accessToken: string
) =>
    axios.patch(
        endpoints.alterPushToken(userID),
        {
            op,
            token: pushToken,
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

export const alterAllowsNotifications = (
    userID: number,
    allowsNotifications: boolean,
    accessToken: string
) =>
    axios.patch(
        endpoints.allowNotifications(userID),
        { allowsNotifications },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );


