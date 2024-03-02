import { Jobs } from "./job";
import { Post } from "./post";
import { Review } from "./review";

export type Specialist = {
        ID: number;
        avatar: string;
        images: string[];
        firstName: string;
        lastName: string;
        location: string;
        experience: number;
        jobs: Jobs[];
        lat: number;
        lon: number,
        stars: number,
        phoneNumber?: string,
        about?: string,
        reviews?: Review[],
        verified?: boolean, 
        posts?: Post[],
        idCard?: string
}