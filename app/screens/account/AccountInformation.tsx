import { Button, Input } from '@ui-kitten/components';
import { FlatList, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { Formik } from 'formik';
import { Avatar } from 'react-native-paper';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { router } from 'expo-router';

import { useUser } from '@/hooks/useUser';
import { ScreenView } from '@/components/ScreenView';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { BORDER_RADIUS } from '@/constants';
import { Loading } from '@/components/Loading';
import { updateInformation } from '@/services/user';
import { Row } from '@/components/Row';


export default function AccountInformation() {
    let { user } = useUser();
    const [editProfile, setEditProfile] = useState(false);
    const [imageURI, setImageURI] = useState(user ? user.avatar : "");

    const pickImage = async (
        setBase64Image: (field: string, value: any) => void,
        field: string
    ) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
        });

        if (!result.canceled) {
            const basedImage = `data:image/jpeg;base64,${result.assets[0].base64}`;
            setBase64Image(field, basedImage);
            setImageURI(basedImage);
        }
    };

    const updateUserInformation = useMutation(
        async (values: {
            firstName: string;
            lastName: string;
            email: string;
        }) => {
            const userD = await updateInformation(user ? user.ID : 0, values.firstName, values.lastName, values.email, imageURI);
            if (userD) {
                user = userD
                setEditProfile(false)
            }
        },
    );

    if (updateUserInformation.isLoading) return <Loading />

    return (<Screen>
        {user ? <ScreenView>
            <GoBackRoute />
            <FlatList
                data={[user]}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <>
                        <Formik
                            initialValues={{
                                firstName: item.firstName ? item.firstName : "",
                                lastName: item.lastName ? item.lastName : "",
                                email: item.email ? item.email : "",
                            }}
                            validationSchema={yup.object().shape({
                                firstName: yup.string().required("First name is required."),
                                lastName: yup.string().required("Last name is required."),
                                email: yup.string().email().required("Email address is required."),
                            })}
                            onSubmit={(values) => {
                                updateUserInformation.mutate(values)
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                setFieldTouched,
                                setFieldValue,
                            }) => {
                                return (
                                    <>
                                        <Avatar.Image style={{ alignSelf: "center" }} size={100} source={{ uri: imageURI }} />
                                        {editProfile ? (
                                            <Button
                                                status={"info"}
                                                appearance={"ghost"}
                                                onPress={() => pickImage(setFieldValue, "image")}
                                            >
                                                Update Image
                                            </Button>
                                        ) : null}
                                        <Input
                                            disabled={!editProfile}
                                            style={styles.input}
                                            value={values.firstName}
                                            onChangeText={handleChange("firstName")}
                                            placeholder="First Name"
                                            label="First Name"
                                            autoComplete="name"
                                            textContentType="givenName"
                                            onBlur={() => setFieldTouched("firstName")}
                                            caption={touched.firstName && errors.firstName
                                                    ? errors.firstName
                                                    : undefined
                                            }
                                            status={touched.firstName && errors.firstName ? "danger" : "basic"
                                            }
                                        />
                                        <Input
                                            disabled={!editProfile}
                                            style={styles.input}
                                            value={values.lastName}
                                            onChangeText={handleChange("lastName")}
                                            placeholder="Last Name"
                                            label="Last Name"
                                            textContentType="familyName"
                                            autoComplete="name"
                                            onBlur={() => setFieldTouched("lastName")}
                                            caption={ touched.lastName && errors.lastName
                                                    ? errors.lastName
                                                    : undefined
                                            }
                                            status={touched.lastName && errors.lastName ? "danger" : "basic"}
                                        />
                                        <Input
                                            style={styles.input}
                                            disabled={!editProfile}
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
                                            caption={touched.email && errors.email ? errors.email : undefined}
                                            status={touched.email && errors.email ? "danger" : "basic"}
                                        />
                                        <Input
                                            disabled
                                            style={styles.input}
                                            value={user?.phoneNumber}
                                            label="Phone Number"
                                        />
                                        {editProfile ? <Row style={styles.buttonContainer}>
                                            <Button style={styles.button} onPress={() => setEditProfile(false)}>
                                                Cancel
                                            </Button>
                                            <Button style={styles.button} onPress={() => updateUserInformation.mutate(values)}>
                                                Save
                                            </Button>
                                        </Row> : 
                                        <Button style={styles.input} onPress={() => setEditProfile(true)}>
                                            Edit Profile
                                        </Button>}
                                        <Button style={styles.input} onPress={() => router.push("/screens/authentication/ForgotPasswordScreen")}>
                                            Reset Password
                                        </Button>
                                    </>
                                )
                            }
                            }
                        </Formik>
                    </>
                )}
            />
        </ScreenView> : null}
    </Screen>
    );
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: 10
    },
    input: {
        marginTop: 10,
        borderRadius: BORDER_RADIUS
    },
    button: {
        marginTop: 10,
        borderRadius: BORDER_RADIUS,
        width: "49%"
    },
    imageContainer: {
        paddingVertical: 10,
    },
    buttonContainer: {
        justifyContent: "space-between"
    }
}) 