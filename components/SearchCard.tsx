import { StyleSheet, Image, ViewStyle, Pressable } from 'react-native';
import { Text, Button, Divider } from '@ui-kitten/components';

import { theme } from "@/theme";
import { Specialist } from '@/types/profiles/specialist';
import { Row } from '@/components/Row';
import { Column } from '@/components/Column';
import { BORDER_RADIUS, BUTTON_BORDER_RADIUS } from '@/constants';
import { camelCaseToWords } from '@/utils/handleCase';
import { FavoriteIcon } from './FavoriteIcon';
import { router } from 'expo-router';

export const Card = (
  {
    specialist,
    jobName,
    style,
    onPress,
  }:
    {
      specialist: Specialist,
      jobName: string,
      style?: ViewStyle,
      onPress?: () => void
    }
) => {
  if (specialist) return <Pressable onPress={onPress}>
    <Row style={[styles.container]}>
      <Image source={{ uri: specialist.avatar }} style={styles.image} />
      <Column style={{ flex: 1, justifyContent: "space-between" }}>
        <Row style={{ justifyContent: "space-between" }}>
          <Column style={[styles.defaultPadding, { alignSelf: 'center' }]}>
            <Text category='s1'> {specialist.firstName}, {specialist.lastName}</Text>
            {specialist.location ? <Text category='c1'> {specialist.location}</Text> : null}
            <Text category='c1'> {specialist.experience == 0 ? "New Jotno Specialist" : specialist.experience + "years experience"}</Text>
            {specialist.jobs.length > 0 ? <Text category='c1'> {specialist.jobs[0].frequencies[0].workTypes.join(', ')}</Text> : null}
          </Column>
          {specialist.jobs.length > 0 ? <Column style={[styles.defaultPadding, { alignItems: "flex-end", flex: 1 }]}>
            <Text category='c1'> starting from</Text>
            <Text style={{ fontWeight: "bold" }} category='s1'> {specialist.jobs[0].frequencies?.[0].wagePerType} {camelCaseToWords(specialist.jobs[0].frequencies?.[0].name)}</Text>
            <Divider style={styles.divider} />
            <Text style={{ fontWeight: "bold" }} category='s1'> {specialist.jobs[0].frequencies?.[1]?.wagePerType} {camelCaseToWords(specialist.jobs[0].frequencies?.[1].name)}</Text>
            <Text category='c1'> per {specialist.jobs[0].frequencies?.[0].keyWord}</Text>
          </Column> : null}
        </Row>
        <Row style={{ alignItems: "center", justifyContent: "flex-end" }}>
          <FavoriteIcon specialist={specialist} size={24} />
          <Button
            style={styles.button}
            appearance='filled'
            size='small'
            onPress={() => router.push({ pathname: "/screens/MessageSpecialist", params: { specialistId: specialist.ID, jobName: jobName }}) }
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
    marginLeft: 10,
    width: 100,
    borderColor: theme["color-primary-500"],
    borderRadius: BUTTON_BORDER_RADIUS
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
    width: "100%",
  },
  divider: {
    marginTop: 2,
    marginBottom: 2,
    padding: 2,
    width: 100
  },
});
