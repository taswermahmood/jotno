import { StatusBar } from 'expo-status-bar';
import { Platform, Animated} from 'react-native';
import { Screen } from "@/components/Screen";
import { Card } from '@/components/SearchCard';
import { HEADERHIGHT, LISTMARGIN } from '@/constants';
import { useState } from 'react';
import { AnimatedListHeader } from '@/components/AnimatedListHeader';

export default function SearchModalScreen() {
  const properties = [
    {
      id: 0,
      image: "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain",
      firstName: "Luke",
      lastName: "William",
      location: "Dhanmondi",
      experience: 2,
      wage: 250,
      wageFrequency: "per day",
      currency: "BDT",
      favorite: false,
      tag: ["Housekeeping"]
    },
    {
      id: 1,
      image: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
      firstName: "Ching",
      lastName: "Chang",
      location: "Banani",
      experience: 5,
      wage: 6000,
      wageFrequency: "per month",
      currency: "BDT",
      favorite: true,
      tag: ["Tutor"]
    },
    {
      id: 2,
      image: "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain",
      firstName: "Luke",
      lastName: "William",
      location: "Dhanmondi",
      experience: 2,
      wage: 250,
      wageFrequency: "per day",
      currency: "BDT",
      favorite: false,
      tag: ["Housekeeping"]
    },
    {
      id: 3,
      image: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
      firstName: "Ching",
      lastName: "Chang",
      location: "Banani",
      experience: 5,
      wage: 6000,
      wageFrequency: "per month",
      currency: "BDT",
      favorite: true,
      tag: ["Tutor"]
    },
    {
      id: 4,
      image: "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain",
      firstName: "Luke",
      lastName: "William",
      location: "Dhanmondi",
      experience: 2,
      wage: 250,
      wageFrequency: "per day",
      currency: "BDT",
      favorite: false,
      tag: ["Housekeeping"]
    },
    {
      id: 5,
      image: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
      firstName: "Ching",
      lastName: "Chang",
      location: "Banani",
      experience: 5,
      wage: 6000,
      wageFrequency: "per month",
      currency: "BDT",
      favorite: true,
      tag: ["Tutor"]
    },
    {
      id: 6,
      image: "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain",
      firstName: "Luke",
      lastName: "William",
      location: "Dhanmondi",
      experience: 2,
      wage: 250,
      wageFrequency: "per day",
      currency: "BDT",
      favorite: false,
      tag: ["Housekeeping"]
    },
    {
      id: 7,
      image: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
      firstName: "Ching",
      lastName: "Chang",
      location: "Banani",
      experience: 5,
      wage: 6000,
      wageFrequency: "per month",
      currency: "BDT",
      favorite: true,
      tag: ["Tutor"]
    }
  ];

  const [scrollAnimation] = useState(new Animated.Value(0));

  return (
    <Screen>
      <AnimatedListHeader scrollAnimation={scrollAnimation}/>
      <Animated.FlatList
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollAnimation
              }
            }
          }
        ], { useNativeDriver: true })}
        scrollEventThrottle={16}
        contentContainerStyle = {{paddingTop: HEADERHIGHT + 20}}
        style={{ marginHorizontal: LISTMARGIN }}
        bounces= {false}
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card property={item}></Card>
        )}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
    </Screen>
  );
}
