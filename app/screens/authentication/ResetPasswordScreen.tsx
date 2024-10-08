import { StyleSheet } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";

import { Screen } from "@/components/Screen";
import { ScreenView } from "@/components/ScreenView";
import { PasswordInput } from "@/components/PasswordInput";
import { GoBackRoute } from "@/components/GoBackRoute";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from "@/constants";
import { useLoading } from "@/hooks/useLoading";
import { resetPassword } from "@/services/user";


export default function ResetPasswordScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const { token } = useLocalSearchParams();
    const {setLoading} = useLoading();

    const handleSubmit = async ( values: {
        password: string
        passwordRepeat: string
    }) => {
        try {
            setLoading(true);
            const passwordReset = await resetPassword(
                values.password, 
                token
            );
            if (passwordReset) router.push("/screens/authentication/SignInScreen")
        } finally {
            setLoading(false)
        }
    }
    return <KeyboardAwareScrollView bounces={false} style={{ backgroundColor: "#fff" }}>
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <Text category={"h5"} style={styles.header}>{t("Reset Password")}</Text>
                <Formik
                    initialValues={{
                        password: "",
                        passwordRepeat: "",
                    }}
                    validationSchema={yup.object().shape({
                        password: yup
                            .string()
                            .required("Please enter your password.")
                            .matches(
                                /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&-+=()!? "]).{8,128}$/,
                                "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character."
                            ),
                        passwordRepeat: yup
                            .string()
                            .oneOf([yup.ref("password"), undefined], "Password does not match")
                            .required("Required"),
                    })}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldTouched
                    }) => {
                        return (
                            <>
                                <PasswordInput
                                    style={styles.input}
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    placeholder="Your Password"
                                    label="Password"
                                    onBlur={() => setFieldTouched("password")}
                                    caption={touched.password && errors.password
                                            ? errors.password
                                            : undefined
                                    }
                                    status={touched.password && errors.password ? "danger" : "basic"}
                                />
                                <PasswordInput
                                    style={styles.input}
                                    value={values.passwordRepeat}
                                    onChangeText={handleChange("passwordRepeat")}
                                    placeholder="Repeated Password"
                                    label="Repeat Password"
                                    onBlur={() => setFieldTouched("passwordRepeat")}
                                    caption={touched.passwordRepeat && errors.passwordRepeat
                                            ? errors.passwordRepeat
                                            : undefined
                                    }
                                    status={touched.passwordRepeat && errors.passwordRepeat
                                            ? "danger"
                                            : "basic"
                                    }
                                />
                                <Button style={styles.submitButton} onPress={() => handleSubmit}>
                                    {t("Reset Password")}
                                </Button>
                            </>
                        );
                    }}
                </Formik>
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
    submitButton: {
        marginTop: 20,
        borderRadius: BUTTON_BORDER_RADIUS
    },
});