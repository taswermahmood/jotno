import { StyleSheet, Image, ViewStyle, Pressable, FlatList, View } from 'react-native';
import { Text, Button, Divider } from '@ui-kitten/components';

import { theme } from "@/theme";
import { Specialist } from '@/types/profiles/specialist';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from '@/constants';
import { camelCaseToWords } from '@/utils/handleCase';
import { Card } from 'react-native-paper';
import { router } from 'expo-router';
import { FavoriteIcon } from './FavoriteIcon';

export const FavoritedCard = (
    {
        specialist,
        style,
    }:
        {
            specialist: Specialist,
            style?: ViewStyle,
        }
) => {
    return (
        <Row style={[styles.container]}>
            <Image source={{ uri: specialist.avatar }} style={styles.image} />
            <Column style={{ flex: 1, justifyContent: "space-between" }}>
                <Row style={{ justifyContent: "space-between" }}>
                    <Column style={[styles.defaultPadding, { alignSelf: 'center' }]}>
                        <Text category='s1'> {specialist.firstName}, {specialist.lastName}</Text>
                        {specialist.location ? <Text category='c1'> {specialist.location}</Text> : null}
                        <Text category='c1'> {specialist.experience == 0 ? "New Jotno Specialist" : specialist.experience + "years experience"}</Text>
                    </Column>
                    <Row style={{ alignItems: "center", justifyContent: "flex-end" }}>
                        <FavoriteIcon specialist={specialist} size={24} />
                        <Button
                            style={styles.button}
                            appearance='filled'
                            size='small'
                            onPress={() => { }}
                        >
                            Contact
                        </Button>
                    </Row>
                </Row>
                <Row style={[{ alignItems: "center", justifyContent: "flex-start" }, styles.defaultPadding]}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        pagingEnabled
                        data={specialist.jobs}
                        keyExtractor={(item) => item.jobName}
                        renderItem={({ item }) => (
                            <>
                                <Pressable onPress={() => router.push({ pathname: "/screens/SpecialistDetails", params: { specialistID: specialist.ID, jobName: item.jobName } })}>
                                    <Card style={{ backgroundColor: theme["color-gray"], margin: 5, flexDirection: "column" }}>
                                        <View style={{ margin: 5 }}>
                                            <Text style={{ alignSelf: "center" }} category='label'>{camelCaseToWords(item.jobName)}</Text>
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={item.frequencies}
                                                keyExtractor={(item) => item.name}
                                                renderItem={({ item }) => (
                                                    <>
                                                        <Row>
                                                            <Text category='label' >{camelCaseToWords(item.keyWord)}s: </Text>
                                                            <Text category='label' appearance='hint'>{item.workTypes.join(", ")}</Text>
                                                        </Row>
                                                        <Row>
                                                            <Text category='label'>{camelCaseToWords(item.name)}: </Text>
                                                            <Text category='label'>{item.wagePerType} {item.currency} per {item.keyWord}</Text>
                                                        </Row>
                                                        <Divider style={{ padding: 0.5, margin: 1, backgroundColor: theme["color-primary-500"] }} />
                                                    </>
                                                )} />
                                        </View>
                                    </Card>
                                </Pressable>
                            </>
                        )}
                    />
                </Row>
            </Column>
        </Row >
    )
};

const styles = StyleSheet.create({
    button: {
        margin: 5,
        marginLeft: 10,
        width: 100,
        borderColor: theme["color-primary-500"],
        borderRadius: BUTTON_BORDER_RADIUS
    },
    defaultPadding: {
        padding: 5
    },
    image: {
        margin: 5,
        height: 100,
        width: 100,
        borderRadius: BORDER_RADIUS,
    },
    container: {
        borderRadius: BORDER_RADIUS,
        marginVertical: 5,
        padding: 5,
        width: "100%",
        backgroundColor: "#fff",
        borderColor: theme["color-primary-300"],
        borderBottomWidth: 1
    },
    divider: {
        marginTop: 2,
        marginBottom: 2,
        padding: 2,
        width: 100
    },
});
