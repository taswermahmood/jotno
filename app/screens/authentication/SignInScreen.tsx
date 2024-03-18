import { View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import { Screen } from "@/components/Screen";
import { LoginDivider } from "@/components/LoginDivider";
import { ScreenView } from "@/components/ScreenView";
import { GoogleButton } from "@/components/GoogleButton";
import { FacebookButton } from "@/components/FacebookButton";
import { GoBackRoute } from "@/components/GoBackRoute";
import { PasswordInput } from "@/components/PasswordInput";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from "@/constants";
import { useAuth } from "@/hooks/useAuth";


export default function SignInScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { nativeLogin, facebookAuth, googleAuth } = useAuth()

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
                        onSubmit={async (values) => {
                            await nativeLogin(values)
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
                                        onPress={async () => { await googleAuth() }}
                                    />
                                    <FacebookButton
                                        text="Continue with Facebook"
                                        style={styles.button}
                                        onPress={async () => { await facebookAuth() }}
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
    signInButton: { marginTop: 20, borderRadius: BUTTON_BORDER_RADIUS },
    orContainer: {
        marginVertical: 30,
    },
    button: { marginBottom: 10 },
});

