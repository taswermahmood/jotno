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

export const facebookLoginRegister = async (
    accessToken: string) => {
    try {
        const { data }: UserData = await axios.post(endpoints.facebook, {
            accessToken,
        })
        if (data) return data;
        return null;
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
        if (data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
};


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


export const createJobPosts = async (
    userID: Number,
    jobType: string,
    title: string,
    description: string,
    wage: Number,
    wageFrequency: string,
    dateTime: string
) => {
    try {
        const { data }: JobData = await axios.post(endpoints.createJobPosts, {
            userID,
            jobType,
            title,
            description,
            wage,
            wageFrequency,
            dateTime,
        })
        if (data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
};