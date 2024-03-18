import axios from "axios";

import { endpoints } from "../constants";

export const refreshTokens = async (refreshToken: string) => {
    try {
        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(endpoints.refreshToken, { refreshToken });

        return data;
    } catch (error) {
        return null;
    }
};