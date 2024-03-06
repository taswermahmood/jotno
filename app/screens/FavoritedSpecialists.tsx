import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "@ui-kitten/components";
import LottieView from "lottie-react-native";

import { useUser } from "@/hooks/useUser";
import { theme } from "@/theme-alt";
import { useFavoritedSpecialistQuery } from "@/hooks/queries/useFavoritedSpecialistQuery";
import { Loading } from "@/components/Loading";
import { Screen } from "@/components/Screen";
import { useEffect } from "react";
import { FavoritedCard } from "@/components/FavoritedCard";


export const FavoritedSpecialists = () => {
    const { user } = useUser();
    const favoritedSpecialists = useFavoritedSpecialistQuery();

    useEffect(() => {
        if (
            (!favoritedSpecialists.data || favoritedSpecialists.data.length === 0) &&
            user &&
            user?.favorites &&
            user.favorites.length > 0
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
                    /> : <>
                        <LottieView
                            autoPlay
                            style={styles.lottie}
                            source={require("@/assets/lotties/notFound.json")}
                        />
                        <View style={styles.textContainer}>
                            <Text category={"h6"} style={styles.text}>
                                "You do not have any favorites saved"
                            </Text>
                            <Text appearance={"hint"} style={[styles.text, styles.subHeading]}>
                                "Tap the heart icon on specialists to make them favorites"
                            </Text>
                        </View>
                    </>}
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: "center",
        borderRadius: 5,
    },
    button: {
        width: "33.3%",
        borderRadius: 0,
        borderColor: theme["color-primary-500"],
    },
    applicationButton: { borderTopRightRadius: 5, borderBottomRightRadius: 5 },
    favoritesButton: { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 },
    contactedButton: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    container: { flex: 1, justifyContent: "center" },
    lottie: {
        height: 180,
        width: 180,
        marginBottom: 20,
        alignSelf: "center",
    },
    text: {
        textAlign: "center",
    },
    subHeading: {
        marginTop: 10,
    },
    textContainer: {
        marginVertical: 15,
    },
    signInAndSignUpButtonContainer: {
        marginTop: 15,
    },
    card: { marginVertical: 10 },
});