import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { useLoading } from "../useLoading";
import { useUser } from "../useUser";

const createBookings = (booking: any, userID?: number, token?: string) =>
    axios.post(
        endpoints.createBooking(userID),
        booking, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useCreateBookingMutation = () => {
    const { user } = useUser();
    const { setLoading } = useLoading();
    const queryClient = useQueryClient();
    return useMutation(
        (booking: any) => createBookings(booking, user?.ID, user?.accessToken),
        {
            onMutate: () => {
                setLoading(true);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(queryKeys.myBookings);
            },
            onError: () => {
                alert("Unable to book the specialist");
            },
            onSettled: () => {
                setLoading(false);
            },
        }
    );
};