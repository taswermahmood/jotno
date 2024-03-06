import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";
import { Button, Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LISTMARGIN } from "@/constants";
import { useUser } from "@/hooks/useUser";
import { Loading } from "../../components/Loading";
import { JobPostCard } from "../../components/JobPostCard";
import { CreatePost } from "../../components/CreatePost";
import { useJobPostsQuery } from "@/hooks/queries/useJobPostsQuery";

export const JobPosts = ({style}: {style?: ViewStyle | ViewStyle[]}) => {
    const { t } = useTranslation();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const { user } = useUser();

    const jobPosts = useJobPostsQuery(user?.ID);
    
    if (jobPosts.isFetching) return <Loading />

    const closeCreatePost = () => {
        setShowCreatePost(false);
    }

    if (user && showCreatePost)
        return (
            <View style={{ marginHorizontal: LISTMARGIN }}>
                <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="close" size={28} onPress={() => setShowCreatePost(false)} />
                <CreatePost userId={user.ID} onPost={() => { closeCreatePost() }} />
            </View>
        )
    return <View style={[styles.container, style]}>
        {jobPosts.data && jobPosts.data.length > 0 ? <>
            <FlatList
                data={jobPosts.data}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <JobPostCard style={{ marginHorizontal: LISTMARGIN }} jobPost={item} active={true} />
                )} />
        </> :
            (
                <View style={[styles.lottieContainer, { height: "100%" }]}>
                    <LottieView
                        autoPlay
                        loop
                        style={styles.lottie}
                        source={require("@/assets/lotties/createJobPost.json")}
                    />
                    <View style={styles.headerContainer}>
                        <Text category={"h6"}>{t("Create a job post.")}</Text>
                        <Text appearance={"hint"} style={styles.subHeader}>
                            {t("Have Jotno Specialists reach out to you.")}
                        </Text>
                    </View>
                </View>
            )
        }
        <View style={{ marginHorizontal: LISTMARGIN }}>
            <Button onPress={() => setShowCreatePost(true)} style={styles.button} appearance="filled" > Create post </Button>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    lottieContainer: {
        backgroundColor: "#fff",
        alignItems: "center",
    },
    lottie: {
        height: 250,
        width: 250
    },
    headerContainer: {
        marginHorizontal: 20,
        alignItems: "center"
    },
    subHeader: {
        marginTop: 10,
        textAlign: "center"
    },
    button: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "flex-end",
    },
});