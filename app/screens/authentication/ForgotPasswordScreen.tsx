import { StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Screen } from "@/components/Screen";
import { ScreenView } from "@/components/ScreenView";
import { GoBackRoute } from "@/components/GoBackRoute";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from "@/constants";
import { useLoading } from "@/hooks/useLoading";
import { forgotPassword } from "@/services/user";


export default function ForgotPasswordScreen() {
    const { t } = useTranslation();
    const [emailSent, setEmailSent] = useState(false);
    const { setLoading } = useLoading();

    const handleSubmit = async (values : {email: string}) => {
        try {
            setLoading(true);
            const emailSent = await forgotPassword(values.email);
            if (emailSent?.emailSent) setEmailSent(true)
        } catch (error) {
            alert("Could not send email at this time. Try again later.")
        } finally {
            setLoading(false)
        }
    }

    return <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "#fff" }}>
        <Screen >
            <ScreenView >
                <GoBackRoute />
                {emailSent ? (
                    <>
                        <Text category={"h5"} style={styles.header}> {t("Email Sent!")} </Text>
                        <Text> {t("An email containing instructions about how to change your password has been sent to you. Please check your junk mail or spam section if you do not see an email.")}
                        </Text>
                    </>
                ) : (
                    <>
                        <Text category={"h5"} style={styles.header}> {t("Forgot your password?")} </Text>
                        <Text> {t("Please enter your email, and we'll send you a link to change your password.")} </Text>
                        <Formik
                            initialValues={{
                                email: "",
                            }}
                            validationSchema={yup.object().shape({
                                email: yup.string().email().required("Please enter your email address."),
                            })}
                            onSubmit={ handleSubmit }
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
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            placeholder="Email Address"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            label="Email"
                                            onBlur={() => setFieldTouched("email")}
                                            caption={ touched.email && errors.email ? errors.email : undefined}
                                            status={ touched.email && errors.email ? "danger" : "basic" }
                                        />
                                        <Button style={styles.button} onPress={() => handleSubmit}>
                                            Continue
                                        </Button>
                                    </>
                                );
                            }}
                        </Formik>
                    </>
                )}
            </ScreenView>
        </Screen>
    </KeyboardAwareScrollView>
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        marginVertical: 20
    },
    button: {
        marginTop: 20,
        borderRadius: BUTTON_BORDER_RADIUS
    },
    input: {
        marginTop: 10,
        borderRadius: BORDER_RADIUS
    },
});