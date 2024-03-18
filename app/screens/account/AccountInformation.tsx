import { Button, Input } from '@ui-kitten/components';
import { FlatList, StyleSheet, View } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { Formik } from 'formik';
import { Avatar } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { Redirect, router } from 'expo-router';

import { useUser } from '@/hooks/useUser';
import { ScreenView } from '@/components/ScreenView';
import { GoBackRoute } from '@/components/GoBackRoute';
import { Screen } from "@/components/Screen";
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from '@/constants';
import { Row } from '@/components/Row';
import { UserUpdate } from '@/types/user';
import { SetAddress } from '@/components/SetAddress';


export default function AccountInformation() {
    const { user, updateUserInfo } = useUser();
    if (!user) return <Redirect href="/" />;

    const [editProfile, setEditProfile] = useState(false);
    const [imageURI, setImageURI] = useState(user ? user.avatar : "");
    const [updatedInfo] = useState<UserUpdate>({});
    const [changeAddress, setChangeAddress] = useState(false);
    const [address, setAddress] = useState<string>()

    useEffect(() => {
        if (user?.address) setAddress(user?.address)
    }, [])

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

    const updateUserInformation = (values: any) => {
        updatedInfo.firstName = values.firstName;
        updatedInfo.lastName = values.lastName;
        updatedInfo.email = values.email;
        updatedInfo.avatar = imageURI;
        updatedInfo.address = updatedInfo.address;
        updatedInfo.lat = updatedInfo.lat;
        updatedInfo.lon = updatedInfo.lon;
        updatedInfo.city = updatedInfo.city;
        updateUserInfo(updatedInfo);
        setEditProfile(false);
    }
    if (user)
        return (<Screen>
            {!changeAddress ? <ScreenView>
                <GoBackRoute />
                <FlatList
                    showsVerticalScrollIndicator={false}
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
                                onSubmit={(values) => { updateUserInformation(values) }}
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
                                                caption={touched.lastName && errors.lastName
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
                                            <Input
                                                disabled={!editProfile}
                                                onPressIn={() => setChangeAddress(true)}
                                                style={styles.input}
                                                value={address ? address : "Set Address"}
                                                placeholder="Address"
                                                label="Address"
                                                status={touched.lastName && errors.lastName ? "danger" : "basic"}
                                            />
                                            {editProfile ? <Row style={styles.buttonContainer}>
                                                <Button style={styles.buttonEdit} onPress={() => setEditProfile(false)}>
                                                    Cancel
                                                </Button>
                                                <Button style={styles.buttonEdit} onPress={() => updateUserInformation(values)}>
                                                    Save
                                                </Button>
                                            </Row> :
                                                <View style={styles.buttonContainer}>
                                                    <Button style={styles.button} onPress={() => setEditProfile(true)}>
                                                        Edit Profile
                                                    </Button>
                                                </View>}
                                            <Button style={styles.button} onPress={() => router.push("/screens/authentication/ForgotPasswordScreen")}>
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
            </ScreenView> : <SetAddress updatedInfo={updatedInfo} address={address} onPost={() => { setChangeAddress(false); setAddress(updatedInfo.address) }} />}
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
    buttonEdit: {
        marginTop: 10,
        borderRadius: BUTTON_BORDER_RADIUS,
        width: "49%"
    },
    button: {
        marginTop: 10,
        borderRadius: BUTTON_BORDER_RADIUS,
    },
    imageContainer: {
        paddingVertical: 10,
    },
    buttonContainer: {
        justifyContent: "space-between",
        marginTop: 10
    }
}) 