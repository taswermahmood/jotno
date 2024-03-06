import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import RNPhoneInput from "react-native-phone-number-input";

import { Screen } from "@/components/Screen";
import { ScreenView } from "@/components/ScreenView";
import { GoogleButton } from "@/components/GoogleButton";
import { FacebookButton } from "@/components/FacebookButton";
import { LoginDivider } from "@/components/LoginDivider";
import { PasswordInput } from "@/components/PasswordInput";
import { GoBackRoute } from "@/components/GoBackRoute";
import { BORDER_RADIUS } from "@/constants";
import { PhoneInput } from "@/components/PhoneInput";
import { useAuth } from "@/hooks/useAuth";


export default function SignUpScreen() {
    const { t } = useTranslation();
    const { nativeRegister, facebookAuth, googleAuth } = useAuth()

    const [phoneVerified, setPhoneVerified] = useState(false);
    const phoneRef = useRef<RNPhoneInput>(null);


    return <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "#fff" }}>
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <View>
                    <Text category={"h5"} style={styles.header}>
                        {t("Sign Up")}
                    </Text>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            phoneNumber: "",
                        }}
                        validationSchema={yup.object().shape({
                            firstName: yup.string().required("Please enter your first name."),
                            lastName: yup.string().required("Please enter your last name."),
                            email: yup.string().email().required("Please enter your email address."),
                            phoneNumber: yup.string().required("Please enter your phone number."),
                            password: yup
                                .string()
                                .required("Please enter your password.")
                                .matches(
                                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                                    "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                                ),
                        })}
                        onSubmit={async (values) => { await nativeRegister(values) }}
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
                                    {phoneVerified ?
                                        <>
                                            <Input
                                                style={styles.input}
                                                value={values.firstName}
                                                onChangeText={handleChange("firstName")}
                                                placeholder={t("First Name")}
                                                label={t("First Name")}
                                                autoComplete="name"
                                                textContentType="givenName"
                                                onBlur={() => setFieldTouched("firstName")}
                                                caption={
                                                    touched.firstName && errors.firstName
                                                        ? errors.firstName
                                                        : undefined
                                                }
                                                status={
                                                    touched.firstName && errors.firstName ? "danger" : "basic"
                                                }
                                            />
                                            <Input
                                                style={styles.input}
                                                value={values.lastName}
                                                onChangeText={handleChange("lastName")}
                                                placeholder={t("Last Name")}
                                                label={t("Last Name")}
                                                textContentType="familyName"
                                                autoComplete="name"
                                                onBlur={() => setFieldTouched("lastName")}
                                                caption={
                                                    touched.lastName && errors.lastName
                                                        ? errors.lastName
                                                        : undefined
                                                }
                                                status={
                                                    touched.lastName && errors.lastName ? "danger" : "basic"
                                                }
                                            />
                                            <Input
                                                style={styles.input}
                                                value={values.email}
                                                onChangeText={handleChange("email")}
                                                placeholder={t("Email")}
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                                textContentType="emailAddress"
                                                autoComplete="email"
                                                autoCorrect={false}
                                                label={t("Email")}
                                                onBlur={() => setFieldTouched("email")}
                                                caption={
                                                    touched.email && errors.email
                                                        ? errors.email
                                                        : undefined
                                                }
                                                status={touched.email && errors.email ? "danger" : "basic"}
                                            />
                                            <PasswordInput
                                                style={styles.input}
                                                value={values.password}
                                                onChangeText={handleChange("password")}
                                                placeholder={t("Password")}
                                                label={t("Password")}
                                                onBlur={() => setFieldTouched("password")}
                                                caption={
                                                    touched.password && errors.password
                                                        ? errors.password
                                                        : undefined
                                                }
                                                status={
                                                    touched.password && errors.password ? "danger" : "basic"
                                                }
                                            />
                                            <Button
                                                style={styles.signUpButton}
                                                onPress={() => handleSubmit()}
                                            >
                                                {t("Sign up")}
                                            </Button>

                                            <LoginDivider style={styles.orContainer} />

                                            <GoogleButton
                                                text={t("Sign up with Google")}
                                                style={styles.button}
                                                onPress={async () => { await googleAuth() }}
                                            />
                                            <FacebookButton
                                                text={t("Sign up with Facebook")}
                                                style={styles.button}
                                                onPress={async () => { await facebookAuth() }}
                                            />
                                        </> : <>
                                            <PhoneInput
                                                onChangeText={handleChange("phoneNumber")}
                                                phoneNumber={values.phoneNumber}
                                                style={styles.input}
                                                phoneRef={phoneRef}
                                                error={
                                                    touched.phoneNumber && errors.phoneNumber
                                                        ? errors.phoneNumber
                                                        : undefined
                                                }
                                                onBlur={() => setFieldTouched("phoneNumber")}
                                            />
                                            <Button
                                                disabled={phoneRef.current?.isValidNumber(values.phoneNumber) ? false : true}
                                                style={styles.signUpButton}
                                                onPress={() => setPhoneVerified(true)}
                                            >
                                                {t("Continue")}
                                            </Button></>}
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </ScreenView>
        </Screen>
    </KeyboardAwareScrollView>
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        marginVertical: 20
    },
    input: {
        marginTop: 10,
        borderRadius: BORDER_RADIUS
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginTop: 5
    },
    signUpButton: {
        marginTop: 20,
        borderRadius: BORDER_RADIUS
    },
    orContainer: {
        marginVertical: 30,
    },
    button: {
        marginBottom: 10,
        borderRadius: BORDER_RADIUS
    },
});