import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Button } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LISTMARGIN } from "@/constants";
import { useUser } from "@/hooks/useUser";
import { Loading } from "../../components/Loading";
import { JobPostCard } from "../../components/JobPostCard";
import { CreatePost } from "../../components/CreatePost";
import { useJobPostsQuery } from "@/hooks/queries/useJobPostsQuery";
import { Redirect } from "expo-router";
import { Screen } from "@/components/Screen";
import { AnimationLottie } from "@/components/AnimationLottie";

export const JobPosts = () => {
    const { user } = useUser()
    if (!user) return <Redirect href="/" />;

    const { t } = useTranslation();
    const [showCreatePost, setShowCreatePost] = useState(false);
    const jobPosts = useJobPostsQuery(user?.ID);
    if (jobPosts.isFetching) return <Loading />

    const closeCreatePost = () => {
        setShowCreatePost(false);
    }

    if (user && showCreatePost)
        return (
            <Screen style={{ marginHorizontal: LISTMARGIN }}>
                <MaterialCommunityIcons style={{ alignSelf: "flex-end", padding: 5 }} name="close" size={28} onPress={() => setShowCreatePost(false)} />
                <CreatePost userId={user.ID} onPost={() => { closeCreatePost() }} />
            </Screen>
        )
    return (
        <Screen>
            {jobPosts.data && jobPosts.data.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={jobPosts.data}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({ item }) => (
                        <JobPostCard style={{ marginHorizontal: LISTMARGIN }} jobPost={item} active={true} />
                    )} />
                :
                <AnimationLottie
                    title="Create a job post."
                    subHeader="Have Jotno Specialists reach out to you."
                    source={require("@/assets/lotties/createJobPost.json")}
                />

            }
            <View style={{ marginHorizontal: LISTMARGIN }}>
                <Button onPress={() => setShowCreatePost(true)} style={styles.button} appearance="filled" > Create post </Button>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 30,
        zIndex: 100,
        borderRadius: 30,
        alignSelf: "flex-end",
    },
});