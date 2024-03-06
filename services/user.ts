import axios from "axios";

import { endpoints } from "@/constants";
import { User } from "@/types/user";
import { handleError } from "@/utils/handleError";
import { JobPost } from "@/types/jobPost";

type UserData = { data: User }
type JobData = { data: JobPost }

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


export const updateInformation = async (
    userID: Number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.updateUserInformation, {
            userID,
            firstName,
            lastName,
            email,
            avatar
        })
        if (data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
};

export const alterPushToken = (
    userID: number,
    op: "add" | "remove",
    pushToken: string,
    // accessToken: string
) =>
    axios.patch(
        endpoints.alterPushToken(userID),
        {
            op,
            token: pushToken,
        },
        // {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // }
    );

export const alterAllowsNotifications = (
    userID: number,
    allowsNotifications: boolean,
    // accessToken: string
) =>
    axios.patch(
        endpoints.allowNotifications(userID),
        { allowsNotifications },
        // {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // }
    );


