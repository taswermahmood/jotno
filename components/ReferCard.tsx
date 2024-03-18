import { Share, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { BUTTON_BORDER_RADIUS } from '@/constants';

export const ReferCard = () => {
    const { t } = useTranslation();
    const shareItem = async () => {
        try {
            await Share.share({message: "Come join me at Jotno and find the care you deserve."});
        } catch (error: unknown) {
            alert("Sorry, we're unable to share");
        }
    };
    return <Card style={{ margin: 10, backgroundColor: "#fff" }}>
        <LottieView
            autoPlay
            style={{ height: 150, width: 150, alignSelf: 'center' }}
            source={require("@/assets/lotties/refer.json")} />
        <Card.Content>
            <Text variant="titleLarge">{t("Invite to Jotno")}</Text>
            <Text variant="bodyMedium">{t("Share this code with your friends and family members. When they sign up with your code, each of your will receive 50 BDT as wallet credit.")}</Text>
        </Card.Content>
        <Button style={styles.button} onPress={shareItem}>{t("Share")}</Button>
    </Card>
};

const styles = StyleSheet.create({
    lottieContainer: {
        height: 150,
        width: 150,
        alignSelf: 'center'
    },
    button: {
        margin: 10,
        borderRadius: BUTTON_BORDER_RADIUS
    }
});
