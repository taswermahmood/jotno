import axios from "axios";

import { endpoints } from "@/constants";
import { handleError } from "@/utils/handleError";
import { Specialist } from "@/types/profiles/specialist";

type SpecialistData = { data: Specialist }

export const getSpecialistById = async (
    id: number) => {
    try {
        const { data }: SpecialistData = await axios.get(`${endpoints.getSpecialistById}${id}`)
        if (data) return data;
        return null;
    } catch (error) {
        handleError(error)
    }
};