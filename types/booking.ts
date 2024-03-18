import { Bill } from "./bill"

export type Bookings = {
    active: Booking[],
    pending: Booking[],
    completed: Booking[]
}

export type Booking = {
    ID: number,
    CreatedAt: string,
    userID: number,
    specialistID: number,
    jobType: string,
    amount: number,
    frequency: string,
    currency: string,
    overdue: boolean,
    dateTime: string,
    startDate: string,
    endDate?: string,
    bills?: Bill[]
}

// UserID       uint   `json:"userID"`
// SpecialistID uint   `json:"specialistID"`
// JobType      string `json:"jobType"`
// Active       bool   `json:"active"`
// Status       string `json:"status"`
// Frequency    string `json:"frequency"`
// Amount       int32  `json:"amount"`
// Currency     string `json:"currency"`
// Overdue      bool   `json:"overdue"`
// Bills        []Bill `json:"bills"`
// StartDate    string `json:"startDate"`
// EndDate      string `json:"endDate"`