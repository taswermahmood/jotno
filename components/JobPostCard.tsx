import { StyleSheet, ViewStyle, Pressable, TouchableOpacity, FlatList, View } from 'react-native';
import { Text, Button, Divider } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from "@/theme";
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { BORDER_RADIUS, endpoints } from '@/constants';
import { JobPost } from '@/types/jobPost';
import { Avatar, Card, } from 'react-native-paper';
import { router } from 'expo-router';
import { useState } from 'react';
import { Comments } from '@/types/comment';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { camelCaseToWords } from '@/utils/handleCase';
import { getSpecialistById } from '@/services/specialist';
import { Specialist } from '@/types/profiles/specialist';

export const JobPostCard = (
    {
        jobPost,
        style,
        active,
        onPress,
    }:
        {
            jobPost: JobPost,
            active: boolean,
            style?: ViewStyle,
            onPress?: () => void
        }
) => {
    const [showComments, setShowComments] = useState(false)
    const queryClient = useQueryClient();

    const getFormattedDate = (date: Date) => {
        const dateStr = date.toDateString(); // Thu Mar 31 2022
        const dateArr = dateStr.split(" "); // ['Thu', 'Mar', '31', '2022']
        return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
    };

    const deleteJobPost = useMutation(
        () => axios.delete(`${endpoints.deleteJobPost}${jobPost.ID}`),
        {
            onMutate: async () => {
                await queryClient.cancelQueries("myJobPosts");
                const prevJobPosts: { data: JobPost[] } | undefined = queryClient.getQueryData("myJobPosts");
                if (prevJobPosts) {
                    const filtered = prevJobPosts.data.filter((jp) => jp.ID !== jobPost.ID);
                    queryClient.setQueryData("myJobPosts", filtered)
                }
                return prevJobPosts;
            },
            onSettled: () => {
                queryClient.invalidateQueries("myJobPosts");
            },
        }
    )

    const getComments = (item: Comments) => {
        return <Pressable onPress={() => { router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: item.specialistID } }) }} >
            <Row style={styles.container}>
                <Avatar.Image size={50} source={{ uri: item.image }} />
                <Column style={{ marginLeft: 10 }}>
                    <Card style={{ backgroundColor: theme["color-gray"] }}>
                        <View style={{ margin: 5 }}>
                            <Text category='label'>
                                {item.firstName} {item.lastName}
                            </Text>
                            <Text category='s1'>
                                {item.comment}
                            </Text>
                        </View>
                    </Card>
                    <Text style={{ margin: 5 }} appearance='hint' category='c1'>{getFormattedDate(new Date(jobPost.CreatedAt))}</Text>
                </Column>
            </Row>
        </Pressable>
    }

    return <Pressable style={style} key={jobPost.ID} onPress={onPress}>
        <Card elevation={2} style={[styles.container]}>
            <Column style={{ flex: 1 }}>
                <Column style={{ marginHorizontal: 5 }}>
                    <Row >
                        <Text category='label' style={{ color: theme["color-primary-500"] }}>
                            {camelCaseToWords(jobPost.jobType)}
                        </Text>
                    </Row>
                    <Row style={{ justifyContent: "space-between", marginVertical: 5 }}>
                        <Column style={{ width: "50%" }}>
                            <Text category='s1' style={{ fontWeight: "bold" }}>
                                {jobPost.title}
                            </Text>
                            <Text category='c1' appearance="hint">Posted: {new Date(jobPost.CreatedAt).toLocaleDateString()}</Text>
                        </Column>
                        <Row >
                            <Text category='h6' style={{ marginLeft: 5 }}>
                                {jobPost.wage} {jobPost.wageCurrency}
                            </Text>
                            <Text category='s1' style={{ marginLeft: 5 }}>
                                / {camelCaseToWords(jobPost.wageFrequency)}
                            </Text>
                        </Row>
                    </Row>
                    <Row style={{ marginVertical: 5 }}>
                        <Text category='s1'>
                            {jobPost.description}
                        </Text>
                    </Row>
                </Column>
                <Divider style={styles.divider} />
                <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <>
                        {active ? <>
                            {jobPost.comments.length > 0 ?
                                < TouchableOpacity
                                    onPress={() => { setShowComments(!showComments) }}
                                >
                                    <Row style={{ marginLeft: 5 }}>
                                        <MaterialCommunityIcons name="comment" size={24} color={theme["color-primary-500"]} />
                                        <Text style={{ marginLeft: 5 }}>
                                            {jobPost.comments.length} comments
                                        </Text>
                                    </Row>
                                </TouchableOpacity> :
                                <Text style={{ marginLeft: 5 }} appearance='hint'>
                                    No comments
                                </Text>}
                        </> : <View />}
                        <Row>
                            {active ? <Button
                                style={styles.button}
                                appearance='ghost'
                                size='small'
                                onPress={() => deleteJobPost.mutate()}
                            >
                                Mark Complete
                            </Button> : null}
                            <Button
                                style={styles.button}
                                appearance='filled'
                                size='small'
                                onPress={() => deleteJobPost.mutate()}
                            >
                                Delete
                            </Button>
                        </Row>
                    </>
                </Row>
                {showComments ?
                    <FlatList
                        data={jobPost.comments}
                        keyExtractor={(item) => item.comment}
                        renderItem={({ item }) => (
                            getComments(item)
                        )} /> : null}
            </Column>
        </Card>
    </Pressable>
};

const styles = StyleSheet.create({
    button: {
        margin: 5,
        borderColor: theme["color-primary-500"],
        borderRadius: BORDER_RADIUS
    },
    defaultPadding: {
        padding: 5
    },
    container: {
        borderRadius: BORDER_RADIUS,
        marginVertical: 5,
        padding: 5,
        width: "100%",
        backgroundColor: "#fff",
    },
    divider: {
        marginVertical: 5,
        padding: 1,
    },
});
