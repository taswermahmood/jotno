export type User = {
    ID: number;
    firstName: string;
    lastName?: string;
    email: string;
    avatar: string;
    countryCode: string;
    callingCode: string;
    phoneNumber: string;
    address?: string,
    city?: string,
    lat?: number,
    lon?: number,
    favorited: number[] | null;
    allowsNotifications: boolean;
    pushToken?: string;
    sessionID?: string;
    accessToken: string;
    refreshToken: string
}

export type UserUpdate = {
    firstName?: string;
    lastName?: string;
    email?: string;
    avatar?: string;
    address?: string,
    city?: string,
    lat?: number,
    lon?: number,
}