import { endpoints, queryKeys } from "@/constants"
import axios from "axios"
import { useUser } from "../useUser";
import { useMutation, useQueryClient } from "react-query";
import { Specialist } from "@/types/profiles/specialist";

const favoriteOrUnfavoriteSpecialist = (
    specialistID: number,
    op: "add" | "remove",
    userID?: number,
) =>
    axios.patch(
        `${endpoints.alterFavorites(userID as number)}`,
        {
            specialistID,
            op,
        }
    );

export const useFavoritedSpecialialistMutation = () => {
    const { user } = useUser();
    const queryClient = useQueryClient();
    return useMutation(
        ({ specialistID, op }: { specialistID: number; op: "add" | "remove" }) =>
            favoriteOrUnfavoriteSpecialist(specialistID, op, user?.ID),
        {
            onMutate: async ({ specialistID, op }) => {
                await queryClient.cancelQueries(queryKeys.favorited);
                await queryClient.cancelQueries(queryKeys.searchedSpecialists);
                await queryClient.cancelQueries(queryKeys.selectedSpecialist);

                const prevFavoritedSpecialists: Specialist[] | undefined =
                    queryClient.getQueryData(queryKeys.favorited);
                const prevSearchedSpecialists: Specialist[] | undefined =
                    queryClient.getQueryData(queryKeys.searchedSpecialists);
                const prevSelectedSpecialist: Specialist | undefined =
                    queryClient.getQueryData(queryKeys.selectedSpecialist);

                if (prevSelectedSpecialist?.ID === specialistID) {
                    const newSelectedSpecialist = { ...prevSelectedSpecialist };

                    newSelectedSpecialist.favorited = !newSelectedSpecialist.favorited;
                    queryClient.setQueryData(
                        queryKeys.selectedSpecialist,
                        newSelectedSpecialist
                    );
                }
                if (op === "remove") {
                    if (prevFavoritedSpecialists) {
                        const newSavedSpecialists = prevFavoritedSpecialists.filter(
                            (i) => i.ID !== specialistID
                        );
                        queryClient.setQueryData(
                            queryKeys.favorited,
                            newSavedSpecialists
                        );
                    }
                    if (prevSearchedSpecialists)
                        for (let i of prevSearchedSpecialists) {
                            if (i.ID === specialistID) i.favorited = false;
                        }
                } else if (op === "add") {
                    if (prevSearchedSpecialists) {
                        for (let i of prevSearchedSpecialists) {
                            if (i.ID === specialistID) i.favorited = true;
                        }
                    }
                }
                queryClient.setQueryData(
                    queryKeys.searchedSpecialists,
                    prevSearchedSpecialists
                );
                return {
                    prevFavoritedSpecialists,
                    prevSearchedSpecialists,
                    prevSelectedSpecialist,
                };
            },
            onError: (err, vars, context) => {
                queryClient.setQueryData(
                    queryKeys.favorited,
                    context?.prevFavoritedSpecialists
                );
                queryClient.setQueryData(
                    queryKeys.searchedSpecialists,
                    context?.prevSearchedSpecialists
                );
                queryClient.setQueryData(
                    queryKeys.selectedSpecialist,
                    context?.prevSelectedSpecialist
                );
            },
            onSettled: () => {
                queryClient.invalidateQueries(queryKeys.favorited);
                queryClient.invalidateQueries(queryKeys.searchedSpecialists);
            },
        }
    );
}
