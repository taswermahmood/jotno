import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "react-query";

import { Screen } from "@/components/Screen";
import { ScreenView } from "@/components/ScreenView";
import { GoogleButton } from "@/components/GoogleButton";
import { FacebookButton } from "@/components/FacebookButton";
import { LoginDivider } from "@/components/LoginDivider";
import { PasswordInput } from "@/components/PasswordInput";
import { GoBackRoute } from "@/components/GoBackRoute";
import { BORDER_RADIUS } from "@/constants";
import { registerUser } from "@/services/user";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { Laoding } from "@/components/Loading";


export default function SignUpScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const nativeRegister = useMutation(
        async (values: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        }) => {
            const user = await registerUser(values.firstName, values.lastName, values.email, values.password);
            if (user) {
                login(user);
                router.back();
            }
        }
    );

    if (nativeRegister.isLoading) return <Laoding />

    return <KeyboardAwareScrollView bounces={false}>
        <Screen>
            <ScreenView>
                <GoBackRoute />
                <View>
                    <Text category={"h5"} style={styles.header}>
                        Sign Up
                    </Text>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                        }}
                        validationSchema={yup.object().shape({
                            firstName: yup.string().required("Please enter your first name."),
                            lastName: yup.string().required("Please enter your last name."),
                            email: yup.string().email().required("Please enter your email address."),
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
                            setFieldValue,
                        }) => {
                            return (
                                <>
                                    <Input
                                        style={styles.input}
                                        value={values.firstName}
                                        onChangeText={handleChange("firstName")}
                                        placeholder="First Name"
                                        label="First Name"
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
                                        placeholder="Last Name"
                                        label="Last Name"
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
                                        placeholder="Email Address"
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        autoComplete="email"
                                        autoCorrect={false}
                                        label="Email"
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

                                    <Button
                                        style={styles.signUpButton}
                                        onPress={() => handleSubmit()}
                                    >
                                        Sign Up
                                    </Button>

                                    <LoginDivider style={styles.orContainer} />

                                    <GoogleButton
                                        text="Sign up with Google"
                                        style={styles.button}
                                        onPress={async () => { }}
                                    />
                                    <FacebookButton
                                        text="Sign up with Facebook"
                                        style={styles.button}
                                        onPress={async () => { }}
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