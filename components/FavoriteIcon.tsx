import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Specialist } from "@/types/profiles/specialist";
import { useUser } from "@/hooks/useUser";
import { useFavoritedSpecialialistMutation } from "@/hooks/mutations/useFavoritedSpecialistMutation";

export const FavoriteIcon = ({ specialist, size }: { specialist: Specialist; size: number }) => {
    const { user, setFavoritedSpecialists } = useUser();
    const favoritedSpecialist = useFavoritedSpecialialistMutation();

    const alterUsersFavorites = (
        specialistID: number,
        type: "add" | "remove"
    ) => {
        if (user) {
            let favorties: number[] | undefined = user.favorited
                ? [...user.favorited]
                : [];

            if (type === "add") {
                favorties.push(specialistID);
                user.favorited = favorties
            }
            else {
                favorties = favorties.filter((i) => i !== specialistID)
                user.favorited = favorties
            }
            setFavoritedSpecialists(favorties);
        }
    };
    const handleHeartPress = () => {
        let op: "add" | "remove" = "add";
        if (specialist?.favorited) op = "remove";
        alterUsersFavorites(specialist.ID, op);
        favoritedSpecialist.mutate({ specialistID: specialist.ID, op });
    };
    return <MaterialCommunityIcons
        onPress={() => { handleHeartPress() }}
        name={specialist?.favorited ? "heart" : "heart-outline"}
        size={size}
        color={theme["color-primary-500"]}
    />
}

const styles = StyleSheet.create({
})