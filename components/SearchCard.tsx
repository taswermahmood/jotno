import { StyleSheet, Image, ViewStyle, Pressable } from 'react-native';
import { Text, Button, Divider } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from "@/theme";
import { Specialist } from '@/types/profiles/specialist';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { BORDER_RADIUS } from '@/constants';

export const Card = (
  {
    profile,
    style,
    onPress,
  }:
    {
      profile: Specialist,
      style?: ViewStyle,
      onPress?: () => void
    }
) => {
  return <Pressable key={profile.ID} onPress={onPress}>
    <Row style={[styles.container]}>
      <Image source={{ uri: profile.avatar }} style={styles.image} />
      <Column style={{ flex: 1 }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Column style={[styles.defaultPadding]}>
            <Text category='s1'> {profile.firstName}, {profile.lastName}</Text>
            <Text category='c1'> {profile.location}</Text>
            <Text category='c1'> {profile.experience} years experience</Text>
            <Text category='c1'> {profile.jobs[0].frequencies[0].workTypes.join(', ')}</Text>
          </Column>
          <Column style={[styles.defaultPadding, { alignItems: "flex-end", flex: 1 }]}>
            <Text category='c1'> starting from</Text>
            <Text style={{ fontWeight: "bold" }} category='s1'> {profile.jobs[0].frequencies[0].wagePerType} {profile.jobs[0].frequencies[0].name}</Text>
            <Divider style={styles.divider} />
            <Text style={{ fontWeight: "bold" }} category='s1'> {profile.jobs[0].frequencies[1].wagePerType} {profile.jobs[0].frequencies[1].name}</Text>
            <Text category='c1'> per {profile.jobs[0].frequencies[0].keyWord}</Text>
          </Column>
        </Row>
        <Row style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <MaterialCommunityIcons style={{ alignContent: "flex-end" }} name="heart-outline" color={theme["color-primary-500"]} size={24} />
          <Button
            style={styles.button}
            appearance='filled'
            size='small'
            onPress={onPress}
          >
            Contact
          </Button>
        </Row>
      </Column>
    </Row >
  </Pressable>
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 100,
    borderColor: theme["color-primary-500"],
    borderRadius: BORDER_RADIUS
  },
  defaultPadding: {
    padding: 5
  },
  image: {
    margin: 5,
    height: 100,
    width: 100,
    borderRadius: BORDER_RADIUS,
  },
  container: {
    borderRadius: BORDER_RADIUS,
    marginVertical: 5,
    padding: 5,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: theme["color-primary-300"],
    borderBottomWidth: 1
  },
  divider: {
    marginTop: 2,
    marginBottom: 2,
    padding: 2,
    width: 100
  },
});
