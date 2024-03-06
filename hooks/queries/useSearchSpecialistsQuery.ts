import { endpoints, queryKeys } from "@/constants";
import { Specialist } from "@/types/profiles/specialist";
import axios from "axios";
import { useUser } from "../useUser";
import { useQuery } from "react-query";

const fetchSpecialists = async (boundingBox?: number[], jobName?: string | string[]): Promise<Specialist[]> => {
    if (!boundingBox || boundingBox.length === 0) return [];
    const response = await axios.post(`${endpoints.getSpecialistByBoundingBox}`, {
        jobName: jobName,
        latLow: boundingBox[0],
        latHigh: boundingBox[1],
        lonLow: boundingBox[2],
        lonHigh: boundingBox[3],
    })

    const data: Specialist[] = response.data
    return data;
}

export const useSearchSpecialistsQuery = (boundingBox?: number[], jobName?: string | string[]) => {
    const { user } = useUser();
    const queryResponse = useQuery(
        queryKeys.searchedSpecialists,
        () => fetchSpecialists(boundingBox, jobName)
    );
    const data = queryResponse.data

    if (data)
        for (let specialist of data) {
            specialist.favorited = false;
            if (user?.favorites?.includes(specialist.ID)) specialist.favorited = true;
        }
    return {
        ...queryResponse, data,
    };
}