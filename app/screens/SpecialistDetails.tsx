import { Button, TabView, Text } from '@ui-kitten/components';
import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';

import { ScreenView } from '@/components/ScreenView';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { Tab } from '@ui-kitten/components';
import { BORDER_RADIUS } from '@/constants';
import { SpecialistHeader } from '@/components/profileDetails/Header';
import { SpecialistBasicInfo } from '@/components/profileDetails/BasicInfo';
import { SpecialistFeed } from '@/components/profileDetails/Feed';
import { useSelectedSpecialistQuery } from '@/hooks/queries/useSelectedSpecialistQuery';
import { Loading } from '@/components/Loading';

export default function SpecialistDetailsScreen() {
    const { specialistID, jobName } = useLocalSearchParams();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { t } = useTranslation();

    const specialist = useSelectedSpecialistQuery(Number(specialistID), jobName)

    if (specialist.isFetching) return <Loading />;

    if (!specialist.data )
        return <View style={styles.lottieContainer}>
            <LottieView
                autoPlay
                loop
                style={styles.lottie}
                source={require("@/assets/lotties/notFound.json")}
            />
        </View>

    return (
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <FlatList
                    data={[specialist.data]}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({ item }) => (
                        <>
                            <SpecialistHeader specialist={item} />
                            <TabView
                                style={[styles.marginTop]}
                                selectedIndex={selectedIndex}
                                onSelect={index => setSelectedIndex(index)}
                            >
                                <Tab title='Information'>
                                    <SpecialistBasicInfo specialist={item} />
                                </Tab>
                                <Tab title='Feed'>
                                    <SpecialistFeed specialist={item} />
                                </Tab>
                            </TabView>
                        </>
                    )}
                />
                <Button
                    style={styles.button}
                    appearance='filled'
                    size='large'
                    onPress={() => { }}
                >
                    <Text>{t("Message ")}{specialist.data.firstName}</Text>
                </Button>
            </ScreenView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 10
    },
    button: {
        alignSelf: "center",
        width: "100%",
        borderRadius: BORDER_RADIUS,
        position: "absolute",
        bottom: 20
    },
    lottieContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around"
    },
    lottie: {
        height: 250,
        width: 250
    }
}) 