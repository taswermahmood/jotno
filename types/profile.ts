export type Profile = {
        ID: number;
        avatar: string;
        firstName: string;
        lastName: string;
        location: string;
        experience: number;
        wage: number;
        wageFrequency: string;
        currency: string;
        favorite: boolean;
        tag: string[];
        lat: number;
        lon: number
}