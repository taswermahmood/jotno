import { Button, TabView, Text } from '@ui-kitten/components';
import { FlatList, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { ScreenView } from '@/components/ScreenView';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { Tab } from '@ui-kitten/components';
import { BUTTON_BORDER_RADIUS } from '@/constants';
import { SpecialistHeader } from '@/components/profileDetails/Header';
import { SpecialistBasicInfo } from '@/components/profileDetails/BasicInfo';
import { SpecialistFeed } from '@/components/profileDetails/Feed';
import { useSelectedSpecialistQuery } from '@/hooks/queries/useSelectedSpecialistQuery';
import { Loading } from '@/components/Loading';
import { useUser } from '@/hooks/useUser';
import { AnimationLottie } from '@/components/AnimationLottie';

export default function SpecialistDetailsScreen() {
    const { user } = useUser()
    if (!user) return <Redirect href="/" />;

    const { specialistID, jobName } = useLocalSearchParams();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { t } = useTranslation();

    const specialist = useSelectedSpecialistQuery(Number(specialistID), jobName.toString())

    if (specialist.isFetching) return <Loading />;

    if (!specialist.data)
        return (
            <AnimationLottie
                title="Specialist not available, please choose another specialist"
                source={require("@/assets/lotties/notFound.json")}
            />
        )

    return (
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <FlatList
                    showsVerticalScrollIndicator={false}
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
                    onPress={() => { router.push({ pathname: "/screens/MessageSpecialist", params: { specialistId: specialistID, jobName: jobName } }) }}
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
        borderRadius: BUTTON_BORDER_RADIUS,
        position: "absolute",
        bottom: 20
    }
}) 