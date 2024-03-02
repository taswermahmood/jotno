import { Specialist } from "./profiles/specialist";

export type User = {
    ID: number;
    firstName?: string;
    lastName?: string;
    email: string;
    wallet: number;
    avatar: string;
    phoneNumber: string;
    favorites: Specialist[] | null;
}