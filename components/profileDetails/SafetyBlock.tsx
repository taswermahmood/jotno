import { StyleSheet } from "react-native";
import { Divider, List, ListItem, Text } from "@ui-kitten/components";


import { Screen } from "../Screen";

export const SafetyBlock = () => {
    const data = 
    ["Conduct as many interview as you can.",
     "Check reviews of other users.",
    ]

    const safetyList = ({ item}: { item: string}) => (
        <ListItem
            title={item}
        />
    );

    return (<>
        <Screen>
            <Text category='h5'>Safety Measurements</Text>
            <Text  style={{ margin: 5 }} category='s1'>Verified specialist means Jotno.com has completed initial screening with their ID card. Regardless, you should do the following to ensure your safety.</Text>
            <List
                style={styles.container}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={safetyList}
            />
            <Divider style={{ padding: 5, marginTop: 10, marginBottom: 10 }} ></Divider>
        </Screen>
    </>
    );
};

const styles = StyleSheet.create({
    defaultMarginTop: { marginTop: 10 },
    container: {
        maxHeight: 200,
    },
});