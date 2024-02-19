import axios from "axios";

import { endpoints } from "@/constants";
import { User } from "@/types/user";
import { handleError } from "@/utils/handleError";

type UserData = { data: User }

export const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.register, {
            firstName,
            lastName,
            email,
            password
        })
        if (data) return data;
        return null;
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
        if (data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
};