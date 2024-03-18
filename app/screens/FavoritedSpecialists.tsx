import { View, StyleSheet, FlatList } from "react-native";

import { useUser } from "@/hooks/useUser";
import { useFavoritedSpecialistQuery } from "@/hooks/queries/useFavoritedSpecialistQuery";
import { Loading } from "@/components/Loading";
import { Screen } from "@/components/Screen";
import { useEffect } from "react";
import { FavoritedCard } from "@/components/FavoritedCard";
import { Redirect } from "expo-router";
import { AnimationLottie } from "@/components/AnimationLottie";


export const FavoritedSpecialists = () => {
    const { user } = useUser()
    if (!user) return <Redirect href="/" />;

    const favoritedSpecialists = useFavoritedSpecialistQuery();

    useEffect(() => {
        if (
            (!favoritedSpecialists.data || favoritedSpecialists.data.length === 0) 
            && user && user?.favorited && user.favorited.length > 0
        ) favoritedSpecialists.refetch();

    }, []);

    if (favoritedSpecialists.isLoading)
        return <Loading />;

    return (
        <Screen>
            <View style={styles.container}>
                {favoritedSpecialists?.data && favoritedSpecialists.data.length > 0 ?
                    < FlatList
                        showsVerticalScrollIndicator={false}
                        data={favoritedSpecialists.data}
                        style={{ marginTop: 10 }}
                        renderItem={({ item }) => (
                            <FavoritedCard
                                specialist={item}
                                style={styles.card}
                            />
                        )}
                        keyExtractor={(item) => item.ID.toString()}
                    /> :
                    <AnimationLottie
                        title="You do not have any favorites saved"
                        subHeader="Tap the heart icon on specialists to make them favorites"
                        source={require("@/assets/lotties/notFound.json")}
                    />
                }
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    card: {
        marginVertical: 10
    },
});