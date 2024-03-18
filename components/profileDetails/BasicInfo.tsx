import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

import { Row } from "@/components/Row";
import { Specialist } from "@/types/profiles/specialist";
import { Screen } from "../Screen";
import { SafetyBlock } from "./SafetyBlock";
import { SpecialistsReview } from "./Reviews";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Column } from "../Column";
import { LocationSection } from "./Location";
import { Jobs } from "@/types/profiles/job";
import { PayRates } from "./PayRates";
import { JDivider } from "../Divider";
import { AnimationLottie } from "../AnimationLottie";


export const SpecialistBasicInfo = ({ specialist }: { specialist: Specialist }) => {
    const [currentJob, setCurrentJob] = useState<Jobs>(specialist.jobs[0]);

    useEffect(() => {
        if (specialist.jobs[0] !== currentJob) {
            setCurrentJob(specialist.jobs[0])
        }
    }, [specialist.jobs])
    return (
        <Screen >
            {/* about */}
            {specialist.about ? <View style={styles.defaultMarginTop}>
                <Text category='h5'>About me</Text>
                <Text category='s1' style={{ margin: 5 }}>
                    {specialist.about}
                </Text>
                <JDivider />
            </View> : null}

            {/* pay rates */}
            {currentJob ? <>
                <PayRates currentJob={currentJob} />
                <JDivider />
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
                <JDivider />
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
                </> :
                    <AnimationLottie
                        title="No reviews yet for this specialist"
                        subHeader="Find Jotno Specialist anytime and anywhere."
                        source={require("@/assets/lotties/notFound.json")}
                    />
                }
                <JDivider />
            </>
            <LocationSection specialist={specialist} style={{ paddingBottom: "20%" }} />
        </Screen>
    );
};

const styles = StyleSheet.create({
    defaultMarginTop: {
        marginTop: 10
    }
});