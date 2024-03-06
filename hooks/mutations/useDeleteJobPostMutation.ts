import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { JobPost } from "@/types/jobPost";


const deleteJobPost = (jobPostId: number) =>
    axios.delete(`${endpoints.deleteJobPost}${jobPostId}`);

export const useDeletePropertyMutation = () => {
    const queryClient = useQueryClient();
    // const { user } = useUser();

    return useMutation((jobPostId: number ) => deleteJobPost(jobPostId),
        {
            onMutate: async (jobPostId) => {
                await queryClient.cancelQueries(queryKeys.myJobPosts);
                const prevProperties: JobPost[] | undefined = queryClient.getQueryData(queryKeys.myJobPosts);

                if (prevProperties) {
                    const filtered = prevProperties.filter((i) => i.ID !== jobPostId);
                    queryClient.setQueryData(queryKeys.myJobPosts, filtered);
                }
                return { prevProperties };
            },
            onError: (err, newTodo, context) => {
                if (context?.prevProperties)
                    queryClient.setQueryData(queryKeys.myJobPosts, context?.prevProperties);
            },
            onSettled: () => {
                queryClient.invalidateQueries(queryKeys.myJobPosts);
            },
        }
    );
};