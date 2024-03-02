import { View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { useTranslation } from "react-i18next";

import { Screen } from "@/components/Screen";
import { LoginDivider } from "@/components/LoginDivider";
import { ScreenView } from "@/components/ScreenView";
import { GoogleButton } from "@/components/GoogleButton";
import { FacebookButton } from "@/components/FacebookButton";
import { GoBackRoute } from "@/components/GoBackRoute";
import { PasswordInput } from "@/components/PasswordInput";
import { BORDER_RADIUS } from "@/constants";
import { facebookLoginRegister, googleLoginRegister, loginUser } from "@/services/user";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/Loading";


export default function SignInScreen() {
    const router = useRouter();
    const { login } = useAuth();
    const { t } = useTranslation();

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

    const nativeLogin = useMutation(
        async (values: { email: string; password: string }) => {
            const user = await loginUser(values.email, values.password);
            if (user) {
                login(user);
                router.back();
            }
        }
    );

    const facebookLogin = useMutation(async () => {
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

    const googleLogin = useMutation(async () => {
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

    if (nativeLogin.isLoading || facebookLogin.isLoading || googleLogin.isLoading) return <Loading />

    return <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "#fff" }}>
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <View>
                    <Text category={"h5"} style={styles.header}>
                        {t("Log In")}
                    </Text>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={yup.object().shape({
                            email: yup.string().email().required("Please enter your email address."),
                            password: yup.string().required("Please enter your password."),
                        })}
                        onSubmit={(values) => {
                            nativeLogin.mutate(values)
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
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        placeholder="Email Address"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoComplete="email"
                                        label="Email"
                                        autoCorrect={false}
                                        onBlur={() => setFieldTouched("email")}
                                        caption={
                                            touched.email && errors.email ? errors.email : undefined
                                        }
                                        status={touched.email && errors.email ? "danger" : "basic"}
                                    />
                                    <PasswordInput
                                        style={styles.input}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        placeholder="Password"
                                        label="Password"
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

                                    <TouchableOpacity
                                        style={styles.forgotPasswordContainer}
                                        onPress={() => router.push("/screens/authentication/ForgotPasswordScreen")}
                                    >
                                        <Text category={"c1"} status={"info"}>
                                            {t("Forgot your password?")}
                                        </Text>
                                    </TouchableOpacity>

                                    <Button
                                        style={styles.signInButton}
                                        onPress={() => handleSubmit()}
                                    >
                                        {t("Log In")}
                                    </Button>

                                    <LoginDivider style={styles.orContainer} />
                                    <GoogleButton
                                        text="Continue with Google"
                                        style={styles.button}
                                        onPress={() => { googleLogin.mutate() }}
                                    />
                                    <FacebookButton
                                        text="Continue with Facebook"
                                        style={styles.button}
                                        onPress={() => { facebookLogin.mutate() }}
                                    />
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
    header: { textAlign: "center", marginVertical: 20 },
    input: {
        marginTop: 10,
        borderRadius: BORDER_RADIUS
    },
    forgotPasswordContainer: { alignItems: "center", marginTop: 5 },
    signInButton: { marginTop: 20, borderRadius: BORDER_RADIUS },
    orContainer: {
        marginVertical: 30,
    },
    button: { marginBottom: 10 },
});

