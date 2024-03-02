import { Comments } from "./comment"

export type JobPost = {
    ID: number,
    CreatedAt: string,
    userID: number,
    jobType: string,
    title: string,
    description: string,
    wage: number,
    wageCurrency: string,
    wageFrequency: string,
    dateTime: string,
    comments: Comments[]
}