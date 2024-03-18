import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";

import { theme } from "@/theme";
import { BORDER_RADIUS } from "@/constants";
import { Row } from "../Row";
import { camelCaseToWords } from "@/utils/handleCase";
import { Jobs } from "@/types/profiles/job";

export const PayRates = ({
    currentJob
}: {
    currentJob: Jobs
}) => {
    return (<>
        <Text category='h5'>{camelCaseToWords(currentJob.jobName)} fees</Text>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={currentJob.frequencies}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <View style={styles.viewContainer}>
                    <Row style={styles.contentMargin}>
                        <Text category='s1' style={styles.bold}>
                            Payment:
                        </Text>
                        <Text category='s1' style={styles.defaultMarginLeft}>
                            {camelCaseToWords(item.name)}
                        </Text>
                    </Row>
                    <Row style={styles.contentMargin}>
                        <Text category='s1' style={styles.bold}>
                            {camelCaseToWords(item.keyWord)}s:
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
    </>
    );
};

const styles = StyleSheet.create({
    viewContainer: {
        backgroundColor: theme["color-primary-100"],
        margin: 5,
        padding: 10,
        borderRadius: BORDER_RADIUS
    },
    defaultMarginLeft: {
        marginLeft: 5
    },
    contentMargin: {
        margin: 5
    },
    bold: {
        fontWeight: "bold"
    },
});