import { StyleSheet, View, Dimensions, Image, FlatList, ViewStyle } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from "@/theme";
import { Property } from '@/types/property';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { LISTMARGIN, WIDTH } from '@/constants';
import { Size } from '@ui-kitten/components/devsupport';

export const Card = (
  { property, style }:
    { property: Property, style?: ViewStyle }
) => {
  return <Row style={[styles.container, { flex: 1 }]}>
    <Image source={{ uri: property.image }} style={styles.image} />
    <Column style={{ flex: 1 }}>
      <Row style={{ justifyContent: "space-between" }}>
        <Column style={[styles.defaultPadding]}>
          <Text category='s1'> {property.firstName}, {property.lastName}</Text>
          <Text category='c1'> {property.location}</Text>
          <Text category='c1'> {property.experience} years experience</Text>
        </Column>
        <Column style={[styles.defaultPadding, { alignItems: "flex-end", flex: 1 }]}>
          <Text category='c1'> starting from</Text>
          <Text category='h6'> {property.wage} {property.currency}</Text>
          <Text category='c1'> {property.wageFrequency}</Text>
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
    height: "50%",
    borderColor: theme["color-primary-500"],
    borderRadius: 15
  },
  defaultPadding: {
    padding: 10
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 15
  },
  container: {
    marginVertical: 5,
    width: "100%",
    borderRadius: 15,
    borderColor: theme["color-primary-300"],
    borderWidth:1
  }
});
