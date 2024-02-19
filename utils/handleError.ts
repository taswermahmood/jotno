import axios from "axios";
import { Error } from "@/types/error";


export const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) return alert((error.response.data as Error).detail);
        return alert(error.message)
    }
}