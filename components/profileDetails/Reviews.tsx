import { useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { Review } from "@/types/profiles/review";
import { Row } from "../Row";
import { theme } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BORDER_RADIUS } from "@/constants";

export const SpecialistsReview = ({
    reviews,
    style,
}: {
    reviews?: Review[];
    style?: ViewStyle;
}) => {
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();

    const handleButtonPress = () => setShowMore(!showMore);

    const showReviews = (item: Review) => {
        return (<View key={item.ID} style={styles.viewContainer}>
            <Row style={{ margin: 5, justifyContent: "space-between" }}>
                <Text category='s1' style={{ fontWeight: "bold" }}>
                    {item.creatorFirstName} {item.creatorLastName}
                </Text>
                <Text category='s1' appearance="hint" style={{ marginLeft: 5 }}>
                    {item.CreatedAt}
                </Text>
            </Row>
            <Row style={{ margin: 5, justifyContent: "space-between" }}>
                <Text category='s1' style={{ fontWeight: "bold" }}>
                    {item.title}
                </Text>
                <Row>
                    {getStarsIcons(item)}
                </Row>
            </Row>
            <Text category='s1' style={{ marginHorizontal: 5 }}>
                {item.body}
            </Text>
        </View>)
    }

    const getStarsIcons = (item: Review) => {
        let stars = [];
        for (let i = 0; i < item.stars; i++) {
            stars.push(
                <MaterialCommunityIcons name="star" size={24} color={theme["color-warning-400"]} />
            )
        }
        return stars;
    };

    const ShowButton = ({ text }: { text: string }) => (
        <Button
            appearance={"ghost"}
            status={"info"}
            style={styles.showButton}
            onPress={handleButtonPress}
        >
            {text}
        </Button>
    );

    const getList = () => {
        if (!reviews || reviews.length === 0) return;

        if (reviews.length > 2 && !showMore)
            return (
                <>
                    {reviews.map((item, index) =>
                        index < 2 ? (
                            showReviews(item)
                        ) : null
                    )}
                    <ShowButton text="See More" />
                </>
            );

        return (
            <>
                {reviews.map((item) => (
                    showReviews(item)
                ))}
                {reviews.length > 2 ? <ShowButton text="See Less" /> : null}
            </>
        );
    };

    return <View style={style}>{getList()}</View>;
};

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: theme["color-primary-100"],
        margin: 5,
        padding: 10,
        borderRadius: BORDER_RADIUS
    },
    recentSearchButton: { 
        marginVertical: 5 
    },
    showButton: { 
        alignSelf: "flex-end" 
    },
});