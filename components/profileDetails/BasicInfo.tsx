import { View, StyleSheet, FlatList } from "react-native";
import { Divider, Text } from "@ui-kitten/components";

import { theme } from "@/theme";
import { Row } from "@/components/Row";
import { Specialist } from "@/types/profiles/specialist";
import { BORDER_RADIUS } from "@/constants";
import LottieView from "lottie-react-native";
import { Screen } from "../Screen";
import { SafetyBlock } from "./SafetyBlock";
import { SpecialistsReview } from "./Reviews";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Column } from "../Column";
import { LocationSection } from "./Location";


export const SpecialistBasicInfo = ({ specialist }: { specialist: Specialist }) => {
    const type = "Teaching"
    const index = specialist.jobs.findIndex(i => i.jobName === type)
    const job = specialist.jobs[index];

    const [currentJob, setCurrentJob] = useState(specialist.jobs[index])
    useEffect(() => {
        if (specialist.jobs[index] !== currentJob) {
            setCurrentJob(specialist.jobs[index])
        }
    }, [specialist.jobs])
    return (<Screen >
        {/* about */}
        {specialist.about ? <View style={styles.defaultMarginTop}>
            <Text category='h5'>About me</Text>
            <Text category='s1' style={{ margin: 5 }}>
                {specialist.about}
            </Text>
            <Divider style={styles.divider} ></Divider>
        </View> : null}

        {/* pay rates */}
        {currentJob ? <>
            <Text category='h5'>{type} fees</Text>
            <FlatList
                data={currentJob.frequencies}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.viewContainer}>
                        <Row style={styles.contentMargin}>
                            <Text category='s1' style={styles.bold}>
                                Payment:
                            </Text>
                            <Text category='s1' style={styles.defaultMarginLeft}>
                                {item.name}
                            </Text>
                        </Row>
                        <Row style={styles.contentMargin}>
                            <Text category='s1' style={styles.bold}>
                                {item.keyWord}:
                            </Text>
                            <Text category='s1' style={styles.defaultMarginLeft}>
                                {item.workTypes.join(', ')}
                            </Text>
                        </Row>
                        <Row style={styles.contentMargin}>
                            <Text category='s1' style={styles.bold}>
                                Minimum:
                            </Text>
                            <Text category='s1' style={styles.defaultMarginLeft}>
                                {item.wagePerType} {item.currency} per {item.keyWord.toLowerCase()}.
                            </Text>
                        </Row>
                    </View>
                )} />
            <Divider style={styles.divider} ></Divider>
        </> : null}

        <View style={styles.defaultMarginTop}>
            <Text category='h5'>Verifications</Text>
            <Row style={{ margin: 5 }}>
                <Column style={{ alignItems: "center", margin: 5 }}>
                    <MaterialCommunityIcons name="cellphone-check" size={28} />
                    <Text> Phone Verified </Text>
                </Column>
                {specialist.verified ? <Column style={{ alignItems: "center", margin: 5 }}>
                    <MaterialCommunityIcons name="id-card" size={28} />
                    <Text> ID Verified </Text>
                </Column> : null}
            </Row>
            <Divider style={styles.divider} ></Divider>
        </View>


        <SafetyBlock />
        {/* reviews */}
        <Row>
            <Text category='h5'>Reviews</Text>
            {specialist.reviews && specialist.reviews.length > 0 ? <Text category='h5'>({specialist.reviews.length})</Text> : null}
        </Row> 
        <>
            {specialist.reviews && specialist.reviews.length > 0 ? <>
                <SpecialistsReview reviews={specialist.reviews} />
            </> : <View style={styles.lottieContainer}>
                <LottieView
                    autoPlay
                    loop
                    style={styles.lottie}
                    source={require("@/assets/lotties/notFound.json")}
                />
                <Text category={"h6"}>No reviews yet for this specialist</Text>
            </View>
            }
            <Divider style={styles.divider} ></Divider>
        </>
        <LocationSection specialist={specialist} style={{ paddingBottom: "20%" }} />
    </Screen>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: theme["color-primary-100"],
        margin: 5,
        padding: 10,
        borderRadius: BORDER_RADIUS
    },
    defaultMarginTop: {
        marginTop: 10
    },
    defaultMarginLeft: {
        marginLeft: 5
    },
    contentMargin: {
        margin: 5
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
        padding: 4,
    },
    bold: {
        fontWeight: "bold"
    },
    lottie: {
        height: 200,
        width: 200
    },
    lottieContainer: {
        backgroundColor: "#fff",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100
    },
});