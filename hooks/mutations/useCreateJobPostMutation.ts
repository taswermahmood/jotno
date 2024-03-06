import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { useLoading } from "../useLoading";

const createJobPosts = (jobPost: any) => axios.post(endpoints.createJobPosts, jobPost);

export const useCreateJobPostMutation = () => {
    const { setLoading } = useLoading();
    const queryClient = useQueryClient();
    return useMutation(
        (jobPost: any ) => createJobPosts(jobPost),
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