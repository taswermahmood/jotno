import { StyleSheet, View, Dimensions, Image, FlatList, ViewStyle } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from "@/theme";
import { Profile } from '@/types/profile';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { BORDER_RADIUS } from '@/constants';

export const Card = (
  { profile, style }:
    { profile: Profile, style?: ViewStyle }
) => {
  return <Row key={profile.id} style={[styles.container]}>
    <Image source={{ uri: profile.avatar }} style={styles.image} />
    <Column style={{ flex: 1 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Column style={[styles.defaultPadding]}>
          <Text category='s1'> {profile.firstName}, {profile.lastName}</Text>
          <Text category='c1'> {profile.location}</Text>
          <Text category='c1'> {profile.experience} years experience</Text>
        </Column>
        <Column style={[styles.defaultPadding, { alignItems: "flex-end", flex: 1 }]}>
          <Text category='c1'> starting from</Text>
          <Text category='h6'> {profile.wage} {profile.currency}</Text>
          <Text category='c1'> {profile.wageFrequency}</Text>
        </Column>
      </Row>
      <Row style={{alignItems: "center", justifyContent:"flex-end"}}>
        <MaterialCommunityIcons style={{alignContent: "flex-end"}} name="heart-outline" color={theme["color-primary-500"]} size={24}/>
        <Button
          style={styles.button}
          appearance='filled'
          size='small'
        >
          Contact
        </Button>
      </Row>
    </Column>

  </Row >
};

const styles = StyleSheet.create({
  button: {
    margin: 5,
    width: 100,
    borderColor: theme["color-primary-500"],
    borderRadius: BORDER_RADIUS
  },
  defaultPadding: {
    padding: 10
  },
  image: {
    margin: 5,
    height: 100,
    width: 100,
    borderRadius: BORDER_RADIUS,
    alignSelf: 'center'
  },
  container: {
    borderRadius: BORDER_RADIUS,
    marginVertical: 5,
    paddingBottom:5,
    width: "100%",
    backgroundColor: "#fff",
    borderColor: theme["color-primary-300"],
    borderBottomWidth:1
  }
});
