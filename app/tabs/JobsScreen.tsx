import { Text } from '@ui-kitten/components';
import { Screen } from "@/components/Screen";
import { View } from 'react-native';

export default function JobsScreen() {
  return (
    <Screen>
      <View>
        <Text category='h2' style={{padding:25}}>Jobs Screen</Text>
      </View>
    </Screen>
  );
}
