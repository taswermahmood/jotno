import { StyleSheet, View } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Formik } from "formik";
import * as yup from "yup";

import SignUpSignIn from "..";
import { Screen } from "@/components/Screen";
import { useUser } from "@/hooks/useUser";
import { useSelectedSpecialistQuery } from "@/hooks/queries/useSelectedSpecialistQuery";
import { useCreateChatMutation } from "@/hooks/mutations/useCreateChatMutation";
import { Loading } from "@/components/Loading";
import { PayRates } from "@/components/profileDetails/PayRates";
import { camelCaseToWords } from "@/utils/handleCase";
import { useGetChatQuery } from "@/hooks/queries/useGetChatQuery";
import { ScreenView } from "@/components/ScreenView";
import { GoBackRoute } from "@/components/GoBackRoute";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from "@/constants";
import { AnimationLottie } from "@/components/AnimationLottie";

export default function MessageSpecialist() {
    const params = useLocalSearchParams();
    const { specialistId, jobName } = params;
    const { user } = useUser();
    if (!user) return <Redirect href="/" />;

    const specialist = useSelectedSpecialistQuery(Number(specialistId), jobName.toString());
    useGetChatQuery(Number(specialistId), Number(specialist.data?.jobs[0].ID));

    const createChat = useCreateChatMutation();
    const { t } = useTranslation();

    if (specialist.isFetching) return <Loading />;
    if (!specialist.data)
        return (
            <AnimationLottie
                title="Specialist not available, please choose another specialist"
                source={require("@/assets/lotties/notFound.json")}
            />
        );

    const sendMessage = (text: string) => {
        createChat.mutate({
            specialistID: Number(specialistId),
            userID: user?.ID,
            jobID: Number(specialist.data?.jobs[0].ID),
            senderName: `${user.firstName} ${user.lastName ? user.lastName : ""}`,
            text,
        });
    };
    return (
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <PayRates currentJob={specialist.data.jobs[0]} />
                <View style={{ paddingBottom: 20 }}>
                    <Formik
                        initialValues={{
                            message: "I would like to talk to you about " + camelCaseToWords(jobName.toString()) + " .....",
                        }}
                        validationSchema={yup.object().shape({
                            message: yup.string().required("Required"),
                        })}
                        onSubmit={(values) => {
                            sendMessage(values.message);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            setFieldTouched,
                        }) => {
                            return (
                                <>
                                    <Input
                                        style={styles.input}
                                        value={values.message}
                                        onChangeText={handleChange("message")}
                                        label="Custom Message"
                                        multiline
                                        numberOfLines={5}
                                        onBlur={() => setFieldTouched("message")}
                                        textAlignVertical="top"
                                        caption={
                                            touched.message && errors.message
                                                ? errors.message
                                                : undefined
                                        }
                                        placeholder="Send a message to specialist."
                                        status={touched.message && errors.message ? "danger" : "basic"}
                                    />
                                    <Button style={styles.sendMessageButton} onPress={() => handleSubmit()}>
                                        Send Message
                                    </Button>
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </ScreenView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius: BORDER_RADIUS,
        marginTop: 10,
    },
    sendMessageButton: {
        marginTop: 20,
        borderRadius: BUTTON_BORDER_RADIUS
    }
});