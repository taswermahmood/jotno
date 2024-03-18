import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { useLoading } from "../useLoading";
import { useUser } from "../useUser";

const createJobPosts = (jobPost: any, userID?: number, token?: string) =>
    axios.post(
        endpoints.createJobPosts(userID),
        jobPost, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

export const useCreateJobPostMutation = () => {
    const { user } = useUser();
    const { setLoading } = useLoading();
    const queryClient = useQueryClient();
    return useMutation(
        (jobPost: any) => createJobPosts(jobPost, user?.ID, user?.accessToken),
        {
            onMutate: () => {
                setLoading(true);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(queryKeys.myJobPosts);
            },
            onError: () => {
                alert("Unable to create review");
            },
            onSettled: () => {
                setLoading(false);
            },
        }
    );
};