import { Button, Divider, Layout, TabView, Text } from '@ui-kitten/components';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenView } from '@/components/ScreenView';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { specialists } from "@/types/data"
import { Tab } from '@ui-kitten/components';
import { useState } from 'react';
import { BORDER_RADIUS } from '@/constants';
import { useLocalSearchParams } from 'expo-router';
import { SpecialistHeader } from '@/components/profileDetails/Header';
import { SpecialistBasicInfo } from '@/components/profileDetails/BasicInfo';
import { useTranslation } from 'react-i18next';
import { SpecialistFeed } from '@/components/profileDetails/Feed';

export default function SpecialistDetailsScreen() {

    const { specialistID } = useLocalSearchParams();
    const index = specialists.findIndex(i => i.ID === Number(0))
    const specialist = specialists[index]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const { t } = useTranslation();
    return (
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <FlatList
                    data={[specialist]}
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
                                    <Layout >
                                        <SpecialistBasicInfo specialist={item} />
                                    </Layout>
                                </Tab>
                                <Tab title='Feed'>
                                    <Layout>
                                        <SpecialistFeed specialist={item} /> 
                                    </Layout>
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
                    <Text>{t("Message ")}{specialist.firstName}</Text>
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
}) 