import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Text } from '@ui-kitten/components';
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { JobPostCard } from '@/components/JobPostCard';
import { theme } from '@/theme';
import { CreatePost } from '@/components/CreatePost';
import { Screen } from "@/components/Screen";
import { LISTMARGIN, endpoints } from '@/constants';
import { useQuery } from 'react-query';
import axios from 'axios';
import { JobPost } from '@/types/jobPost';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/Loading';
import { Row } from '@/components/Row';


export default function JobsScreen() {
  const { t } = useTranslation();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const { user } = useAuth();
  const jobPosts = useQuery("myJobPosts", async () => {
    if (user)
      return axios.get<JobPost[]>(
        `${endpoints.getJobPostsById}${user.ID}`
      );
  })
  if (jobPosts.isLoading || jobPosts.isFetching) return <Loading />

  const closeCreatePost = () => {
    setShowCreatePost(false);
    jobPosts.refetch()
  }

  if (user && showCreatePost) return <Screen>
    <View style={{ marginHorizontal: LISTMARGIN }}>
      <MaterialCommunityIcons style={{ alignSelf: "flex-end" }} name="close" size={28} onPress={() => setShowCreatePost(false)} />
      <CreatePost userId={user.ID} onPost={() => { closeCreatePost() }} />
    </View>
  </Screen>

  return (
    <Screen>
      <View style={{ height: "100%" }}>
        {jobPosts.data?.data && jobPosts.data?.data.length > 0 ? <>
          <FlatList
            data={jobPosts.data.data}
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
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Screen >
  );
}

const styles = StyleSheet.create({
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
  pagerView: {
    flex: 1,
  },
});