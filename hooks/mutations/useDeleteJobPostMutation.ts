import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { JobPost } from "@/types/jobPost";
import { useUser } from "../useUser";


const deleteJobPost = (jobPostId: number, userID?: number, token?: string) =>
    axios.delete(endpoints.deleteJobPost(jobPostId, userID), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

export const useDeletePropertyMutation = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();

    return useMutation((jobPostId: number ) => deleteJobPost(jobPostId, user?.ID, user?.accessToken),
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