import { Booking } from "@/types/booking";
import { Button, Text } from "@ui-kitten/components";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { Row } from "./Row";
import { getFormattedDate } from "@/utils/getFormatedDate";
import { camelCaseToWords } from "@/utils/handleCase";
import { Column } from "./Column";
import { theme } from "@/theme";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS, LISTMARGIN } from "@/constants";
import { useTranslation } from "react-i18next";
import { AnimationLottie } from "./AnimationLottie";

export const BookingCard = ({
    style,
    title,
    subHeader,
    cancel,
    bookings,
    bills,
}: {
    bookings: Booking[] | undefined,
    title: string,
    subHeader: string,
    cancel?: boolean,
    bills?: boolean,
    style?: ViewStyle | ViewStyle[];
}) => {
    const { t } = useTranslation();
    return (
        <View style={{ width: "100%" }}>
            {bookings && bookings.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={bookings}
                    keyExtractor={(item) => item.ID.toString()}
                    renderItem={({ item }) => (
                        <Card style={styles.container}>
                            <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
                                <Text category='label'> {getFormattedDate(item.CreatedAt)} </Text>
                                <Text style={{ fontWeight: "bold" }} category='s1'> {item.amount} {item.currency} | {camelCaseToWords(item.frequency)}</Text>
                            </Row>
                            <Row style={{ justifyContent: "space-between", alignItems: "center", marginVertical: 10 }}>
                                <Column>
                                    <Text category='c1'> Job Type: {camelCaseToWords(item.jobType)} </Text>
                                    <Text category='c1'> Start Date: {item.startDate} </Text>
                                </Column>
                                <Column style={{ alignItems: "flex-end" }}>
                                    <Avatar.Text style={{ margin: 5 }} size={32} label="AI" />
                                    <Text category='c1'>Anni Islam</Text>
                                </Column>
                            </Row>
                            {!item.bills && !bills ?
                                <Button
                                    style={styles.button}
                                    appearance='filled'
                                    size='small'
                                >
                                    Complete Job
                                </Button> : null
                            }
                            {item.bills && bills ?
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={item.bills}
                                    keyExtractor={(item) => item.ID.toString()}
                                    renderItem={({ item }) => (
                                        <Card style={{ padding: 5, backgroundColor: theme["color-gray"] }}>
                                            <Column>
                                                <Row style={{ justifyContent: "space-between", }}>
                                                    <Text style={{ marginLeft: 5 }} category='c1'> Current Balance </Text>
                                                    <Text style={{ marginLeft: 5 }} category='label'> Billing date: {getFormattedDate(item.CreatedAt)} </Text>
                                                </Row>
                                                <Text category='h4'> {item.amount} {item.currency} </Text>
                                            </Column>
                                            {!item.paid ?
                                                <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
                                                    <Text style={{ width: "60%", marginLeft: 5 }} category='c2'>
                                                        {t("Once you have paid your jotno specialist, simply click on paid speialist.")}
                                                    </Text>
                                                    <Button
                                                        style={styles.button}
                                                        appearance='filled'
                                                        size='small'
                                                    >
                                                        Pay
                                                    </Button>
                                                </Row> :
                                                <Button disabled style={styles.button} appearance='filled' size='small' >
                                                    Paid
                                                </Button>
                                            }
                                        </Card>
                                    )} />
                                : null}

                            {cancel ?
                                <Button
                                    style={styles.button}
                                    appearance='filled'
                                    size='small'
                                >
                                    Cancel Booking
                                </Button> : null
                            }
                        </Card>
                    )} />
                :
                <View style={{alignSelf: "center"}}>
                    <AnimationLottie
                        title={title}
                        subHeader={subHeader}
                        source={require("@/assets/lotties/notFound.json")}
                    />
                </View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        borderRadius: BORDER_RADIUS,
        marginVertical: 5,
        padding: 5,
        backgroundColor: "#fff",
        marginHorizontal: LISTMARGIN
    },
    button: {
        margin: 5,
        borderRadius: BUTTON_BORDER_RADIUS
    },
});