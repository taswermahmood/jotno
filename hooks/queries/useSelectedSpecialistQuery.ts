import { endpoints, queryKeys } from "@/constants";
import { Specialist } from "@/types/profiles/specialist";
import axios from "axios";
import { useQuery } from "react-query";
import { useUser } from "../useUser";

const fetchSpecialist = async (specialistID: number, jobName: string, userID?: number, token?: string): Promise<Specialist> => {
    const specialist = await axios.get(endpoints.getSpecialistById(specialistID, jobName, userID), {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const data: Specialist = specialist.data
    return data;
}

export const useSelectedSpecialistQuery = (specialistID: number, jobName: string) => {
    const { user } = useUser()
    const queryResponse = useQuery(queryKeys.selectedSpecialist, () => fetchSpecialist(specialistID, jobName, user?.ID, user?.accessToken))
    const data = queryResponse.data;
    if (data)
        if (user?.favorited?.includes(data.ID))
            data.favorited = true;

    return { ...queryResponse, data }
} 