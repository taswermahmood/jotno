import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "react-query";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
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
import { facebookLoginRegister, googleLoginRegister, registerUser } from "@/services/user";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Loading } from "@/components/Loading";
import { PhoneInput } from "@/components/PhoneInput";


export default function SignUpScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation();

    const [phoneVerified, setPhoneVerified] = useState(false);
    const phoneRef = useRef<RNPhoneInput>(null);

    const [__, ___, fbPromt] = Facebook.useAuthRequest({ clientId: "376557685324796" });
    const [_, googleResponse, googleAuth] = Google.useAuthRequest({
        expoClientId:
            "798634518659-dvr083qo5f16396gncnflha1sq9v065g.apps.googleusercontent.com",
        iosClientId:
            "1080382822276-a0ms51p5cfc523bivhchs8nk04u2scq0.apps.googleusercontent.com",
        androidClientId:
            "1080382822276-dqohv9donltabnijor1uun2765hstr4v.apps.googleusercontent.com",
        webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
        selectAccount: true,
    });


    const nativeRegister = useMutation(
        async (values: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            phoneNumber: string;
        }) => {
            const user = await registerUser(values.firstName, values.lastName, values.email, values.password, values.phoneNumber);
            if (user) {
                login(user);
                router.back();
            }
        }
    );

    const facebookRegister = useMutation(async () => {
        const response = await fbPromt();
        if (response.type === "success") {
            const { accessToken } = response.params;
            const user = await facebookLoginRegister(accessToken);
            if (user) {
                login(user);
                router.back();
            }
        }
    });

    const googleRegister = useMutation(async () => {
        const response = await googleAuth();
        if (response.type === "success") {
            const { accessToken } = response.params;
            const user = await googleLoginRegister(accessToken);
            if (user) {
                login(user);
                router.back();
            }
        }
    });

    if (nativeRegister.isLoading || facebookRegister.isLoading || googleRegister.isLoading) return <Loading />


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
                        onSubmit={async (values) => { nativeRegister.mutate(values) }}
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
                                                onPress={async () => { googleRegister.mutate() }}
                                            />
                                            <FacebookButton
                                                text={t("Sign up with Facebook")}
                                                style={styles.button}
                                                onPress={async () => { facebookRegister.mutate() }}
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
                                                disabled={phoneRef.current?.isValidNumber(values.phoneNumber)? false: true}
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