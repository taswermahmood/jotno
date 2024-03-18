import { Text, Input } from '@ui-kitten/components';
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

import { theme } from "@/theme";
import { getSuggestedLocations } from "@/services/location";
import { Location } from '@/types/location';
import { getFormattedLocationText } from '@/utils/getFormattedLocationText';
import { ScreenView } from '@/components/ScreenView';
import { CurrentLocationButton } from '@/components/CurrentLocationButton';
import { RecentSearchList } from '@/components/RecentSearchList';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { Row } from '@/components/Row';
import { BORDER_RADIUS, queryKeys } from '@/constants';
import { useUser } from '@/hooks/useUser';

export default function FindJotnoScreen() {
    const { user } = useUser()
    if (!user) return <Redirect href="/" />;

    const { jobName } = useLocalSearchParams();
    const [value, setValue] = useState("");
    const router = useRouter();
    const [suggestions, setSuggestions] = useState<Location[]>([])
    const queryClient = useQueryClient();

    const recentSearches: Location[] | undefined = queryClient.getQueryData(queryKeys.recentSearches);

    const setRecentSearch = (location: Location) => {
        queryClient.setQueryData(queryKeys.recentSearches, () => {
            if (recentSearches) {
                let included = false;
                for (let i of recentSearches) {
                    if (
                        i.display_name === location.display_name &&
                        i.lon === location.lon &&
                        i.lat === location.lat
                    ) {
                        included = true;
                        break;
                    }
                }
                if (!included) return [location, ...recentSearches];
                return recentSearches;
            }
            return [location];
        });
    };

    const handleChange = async (val: string) => {
        setValue(val)
        if (val.length > 2) {
            const locations = await getSuggestedLocations(val);
            if (locations.length > 0) setSuggestions(locations);
            else setSuggestions([])
        }
    }
    const handleSubmitEditing = async () => {
        const locations = await getSuggestedLocations(value);
        if (locations.length > 0) {
            handleNavigate(locations[0]);
        }
    }

    const SuggestedText = ({
        locationItem,
    }: {
        locationItem: Location;
    }) => {
        const location = getFormattedLocationText(locationItem, "autocomplete");
        return (
            <Row style={styles.suggestionContainer}>
                <Text>{location}</Text>
            </Row>
        );
    };

    const handleNavigate = (location: Location) => {
        setRecentSearch(location);
        router.push({
            pathname: "/screens/SearchResults", params: {
                jobName: jobName,
                location: getFormattedLocationText(location, "autocomplete"),
                lat: location.lat,
                lon: location.lon,
                boundingBox: location.boundingbox,
            }
        });
    };

    const getInput = () => {
        return (
            <Row style={styles.container}>
                <GoBackRoute />
                <Input
                    keyboardType="default"
                    autoFocus
                    selectionColor={theme["color-primary-500"]}
                    placeholder='Find Jonto specialist near'
                    size='large'
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={{ flex: 1, borderRadius: BORDER_RADIUS }}
                />
            </Row>
        )
    }

    return (
        <Screen>
            <ScreenView style={styles.content}>
                {getInput()}
                {suggestions.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={suggestions as Location[]}
                        keyExtractor={(item, index) => item.place_id + index}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    handleNavigate(item)
                                }}
                            >
                                <SuggestedText locationItem={item} />
                            </TouchableOpacity>
                        )}
                    />
                ) : <ScrollView bounces={false}>
                    <CurrentLocationButton jobName={jobName} style={styles.currentLocationButton} />
                    <RecentSearchList
                        style={styles.recentSearchContainer}
                        recentSearches={recentSearches}
                        jobName={jobName}
                    />
                </ScrollView>}
            </ScreenView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    content: {
        marginHorizontal: 10
    },
    suggestionContainer: {
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme["color-gray"],
    },
    currentLocationButton: {
        marginTop: 20,
    },
    recentSearchContainer: { marginTop: 20 },
}) 