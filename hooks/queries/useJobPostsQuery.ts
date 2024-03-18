import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { JobPost } from "@/types/jobPost";
import { useUser } from "../useUser";

const fetchJobPosts = async (userID: number | undefined, token?: string): Promise<JobPost[]> => {
    const response = await axios.get<JobPost[]>(endpoints.getJobPostsById(userID), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data: JobPost[] = response.data;
    return data;
}

export const useJobPostsQuery = (userID: number | undefined) => {
    const { user } = useUser();
    return useQuery(queryKeys.myJobPosts, () => fetchJobPosts(userID, user?.accessToken));
}