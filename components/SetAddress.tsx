import { Text, Input } from '@ui-kitten/components';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

import { theme } from "@/theme";
import { searchLocations } from "@/services/location";
import { Location } from '@/types/location';
import { getFormattedLocationText } from '@/utils/getFormattedLocationText';
import { ScreenView } from '@/components/ScreenView';
import { Screen } from "@/components/Screen";
import { Row } from '@/components/Row';
import { BORDER_RADIUS } from '@/constants';
import { UserUpdate } from '@/types/user';

export const SetAddress = ({
    updatedInfo,
    address,
    onPost
}: {
    updatedInfo: UserUpdate,
    address?: string,
    onPost: () => void
}) => {
    const [value, setValue] = useState(address ? address : "");
    const [suggestions, setSuggestions] = useState<Location[]>([])

    const handleChange = async (val: string) => {
        setValue(val)
        if (val.length > 2) {
            const locations = await searchLocations(val);
            if (locations.length > 0) setSuggestions(locations);
            else setSuggestions([])
        }
    }
    const handleSubmitEditing = async () => {
        const locations = await searchLocations(value);
        if (locations.length > 0) {
            handleNavigate(locations[0]);
        }
    }

    const SuggestedText = ({ locationItem }: { locationItem: Location; }) => {
        const location = getFormattedLocationText(locationItem, "search");
        return (
            <Row style={styles.suggestionContainer}>
                <Text>{location}</Text>
            </Row>
        );
    };

    const handleNavigate = (location: Location) => {
        updatedInfo.address = location.display_name;
        updatedInfo.lat = Number(location.lat);
        updatedInfo.lon = Number(location.lon);
        updatedInfo.city = location.address.suburb ? location.address.suburb : location.address.neighbourhood ? location.address.neighbourhood : location.address.city;
        onPost();
    };

    const getInput = () => {
        return (
            <View>
                <Text style={{margin: 5}} category='label' appearance='hint'>
                    Change Address
                </Text>
                <Input
                    keyboardType="default"
                    autoFocus
                    selectionColor={theme["color-primary-500"]}
                    placeholder='Set address'
                    size='large'
                    value={value}
                    onChangeText={handleChange}
                    onSubmitEditing={handleSubmitEditing}
                    style={{ borderRadius: BORDER_RADIUS }}
                />
            </View>
        )
    }

    return (
        <Screen>
            <ScreenView>
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
                ) : null}
            </ScreenView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    suggestionContainer: {
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme["color-gray"],
    },
}) 