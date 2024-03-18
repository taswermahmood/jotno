import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { useUser } from "../useUser";
import { Bookings } from "@/types/booking";

const fetchBookings = async (userID: number | undefined, token?: string): Promise<Bookings> => {
    const response = await axios.get<Bookings>(endpoints.getBookingByUserID(userID), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data: Bookings = response.data;
    return data;
}

export const useBookingQuery = (userID: number | undefined) => {
    const { user } = useUser();
    return useQuery(queryKeys.myBookings, () => fetchBookings(userID, user?.accessToken));
}