import axios from "axios";
import { useQuery } from "react-query";

import { endpoints, queryKeys } from "../../constants";
import { Specialist } from "@/types/profiles/specialist";
import { useUser } from "../useUser";

const fetchSpecialists = async (
    userID?: number,
    token?: string
): Promise<Specialist[]> => {
    if (!userID) return [];

    const response = await axios.get(
        endpoints.getFavorites(userID),
        {
              headers: {
                Authorization: `Bearer ${token}`,
              },
        }
    );

    const data: Specialist[] = response.data;
    for (let i of data) i.favorited = true;
    return data;
};

export const useFavoritedSpecialistQuery = () => {
    const { user } = useUser();

    return useQuery(
        queryKeys.favorited,
        () => fetchSpecialists(user?.ID, user?.accessToken),
        {
            retry: false,
        }
    );
};