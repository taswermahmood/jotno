import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";

import { useUser } from "./useUser";
import { useLoading } from "./useLoading";
import { router } from "expo-router";
import { User } from "@/types/user";
import { facebookLoginRegister, googleLoginRegister, loginUser, registerUser } from "@/services/user";
import { useEffect } from "react";

export const useAuth = () => {

    const { login } = useUser();
    const { setLoading } = useLoading();

    const [__, ___, fbPromtAsync] = Facebook.useAuthRequest({ clientId: "376557685324796" });
    const [_, googleResponse, googleAuth] = Google.useAuthRequest({
        expoClientId:
            "798634518659-dvr083qo5f16396gncnflha1sq9v065g.apps.googleusercontent.com",
        iosClientId:
            "798634518659-pe6mqtfhvqctvinpohtivkgm644q382r.apps.googleusercontent.com",
        androidClientId:
            "798634518659-nebdh1h0jeu1an2cq7ol834kgfoqm4og.apps.googleusercontent.com",
        webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
        selectAccount: true,
    });

    useEffect(() => {
        async function googleAuthLogin(accessToken: string) {
            try {
                setLoading(true)
                const user = await googleLoginRegister(accessToken);
                handleSignInUser(user);
            } catch (error) {
                handleAuthErrors();
            } finally {
                setLoading(false)
            }
        }
        if (googleResponse?.type == "success") {
            const { accessToken } = googleResponse.params
            googleAuthLogin(accessToken);
        }
    }, [googleResponse])

    const handleSignInUser = (user?: User | null) => {
        if (user) {
            login(user)
            router.back();
        }
    }
    const handleAuthErrors = () => {
        alert("Unable to authorize.")
    }

    const nativeRegister = async (values: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phoneNumber: string;
    }) => {
        try {
            setLoading(true)
            const user = await registerUser(values.firstName, values.lastName, values.email, values.password, values.phoneNumber);
            handleSignInUser(user);
        } catch (error) {
            handleAuthErrors();
        } finally {
            setLoading(false)
        }
    };

    const nativeLogin = async (values: { email: string; password: string }) => {
        try {
            setLoading(true)
            const user = await loginUser(values.email, values.password);
            handleSignInUser(user);
        } catch (error) {
            handleAuthErrors();
        } finally {
            setLoading(false)
        }
    };

    const facebookAuth = async () => {
        try {
            const response = await fbPromtAsync();
            if (response.type === "success") {
                setLoading(true)
                const { accessToken } = response.params;
                const user = await facebookLoginRegister(accessToken);
                handleSignInUser(user);
            }
        } catch (error) {
            handleAuthErrors();
        } finally {
            setLoading(false)
        }
    }

    return { nativeRegister, nativeLogin, googleAuth, facebookAuth }
}