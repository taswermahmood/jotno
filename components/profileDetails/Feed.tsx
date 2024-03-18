import { StyleSheet, FlatList, Image } from "react-native";
import { Divider, Text } from "@ui-kitten/components";

import { Row } from "@/components/Row";
import { Specialist } from "@/types/profiles/specialist";
import { BORDER_RADIUS, WIDTH } from "@/constants";
import { Screen } from "../Screen";
import { useEffect, useState } from "react";
import { AnimationLottie } from "../AnimationLottie";


export const SpecialistFeed = ({ specialist }: { specialist: Specialist }) => {
    const [currentSpecialistsPosts, setCurrentSpecialistsPosts] = useState(specialist.posts)
    useEffect(() => {
        if (specialist.posts !== currentSpecialistsPosts) {
            setCurrentSpecialistsPosts(specialist.posts)
        }
    }, [specialist.posts])
    return (<Screen >
        {currentSpecialistsPosts && currentSpecialistsPosts.length > 0 ? <>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={currentSpecialistsPosts}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <>
                        <Row key={item.ID} style={{ margin: 5, justifyContent: "space-between" }}>
                            <Text category='s1' style={{ fontWeight: "bold" }}>
                                {specialist.firstName} {specialist.lastName}
                            </Text>
                            <Text category='s1' appearance="hint" style={{ marginLeft: 5 }}>
                                {item.CreatedAt}
                            </Text>
                        </Row>
                        {item.caption ? <Text category='s1' style={{ marginLeft: 5 }}>
                            {item.caption}
                        </Text> : null}
                        {item.media ? <Image style={styles.image} source={{ uri: item.media }} /> : null}
                        <Divider style={styles.divider} ></Divider>
                    </>
                )} />
        </> :
            <AnimationLottie
                title="The specialist has not posted anything"
                source={require("@/assets/lotties/notFound.json")}
            />
        }
    </Screen>
    );
};

const styles = StyleSheet.create({
    image: {
        margin: 5,
        height: 200,
        width: WIDTH,
        borderRadius: BORDER_RADIUS,
        alignSelf: 'center'
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        padding: 4,
    },
});