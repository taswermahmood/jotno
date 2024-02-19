import { Text } from '@ui-kitten/components';
import { Screen } from "@/components/Screen";
import { StyleSheet, View } from 'react-native';
import { SignUpAndSignInButton } from '@/components/SignUpAndSignInButton';
import { theme } from '@/theme';
import { BORDER_RADIUS } from '@/constants';
import { ScreenView } from '@/components/ScreenView';
import { Logo } from '@/components/Logo';
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from 'expo-router';


export default function SignUpSignIn() {
    const { user } = useAuth()
    const router = useRouter();
    return (<>{user ? <Redirect href="/tabs/HomeScreen" /> : < Screen style={styles.container} >
        <Text></Text>
        <ScreenView>
            <Logo />
            <View style={{ position: "absolute", top: "40%" }}>
                <Text style={{ color: theme["color-primary-900"] }} category='h1'>Find the care you deserve</Text>
                <Text style={{ color: theme["color-primary-700"] }} appearance="hint" category='h5'>Pet Care, Elderly Care, Teachers, Housekeeping</Text>
            </View>
        </ScreenView>
        <View style={styles.buttonContainer}>
            <SignUpAndSignInButton />
        </View>
    </Screen >
    }
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme["color-primary-500"],
    },
    buttonContainer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#fff",
        borderTopEndRadius: BORDER_RADIUS,
        borderTopStartRadius: BORDER_RADIUS,
        width: "100%",
        height: "25%",
        justifyContent: "space-evenly"
    }
})


