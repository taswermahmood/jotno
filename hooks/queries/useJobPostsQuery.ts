import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "@/constants";
import { JobPost } from "@/types/jobPost";

const fetchJobPosts = async (userID: number | undefined): Promise<JobPost[]> => {
    const response = await axios.get<JobPost[]>(`${endpoints.getJobPostsById}${userID}`);
    const data: JobPost[] = response.data;
    return data;
}

export const useJobPostsQuery = (userID: number | undefined) => {
    return useQuery(queryKeys.myJobPosts, ()=> fetchJobPosts(userID));
}