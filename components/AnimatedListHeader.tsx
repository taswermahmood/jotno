import { HEADERHIGHT } from "@/constants";
import { Animated, LayoutChangeEvent, View} from "react-native";
import { useState } from "react";

export const AnimatedListHeader = ({ scrollAnimation }: { scrollAnimation: Animated.Value }) => {

    const [offsetAnimation] = useState(new Animated.Value(0));

    const [clampedScroll, setClampedScroll] = useState(
        Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                }),
                offsetAnimation), 0, 1)
    )

    const navbarTranslate = clampedScroll.interpolate({
        inputRange: [0, HEADERHIGHT],
        outputRange: [0, -HEADERHIGHT],
        extrapolate: "clamp"
    })

    const onLayout = (event: LayoutChangeEvent) => {
        let { height } = event.nativeEvent.layout
        setClampedScroll(Animated.diffClamp(
            Animated.add(
                scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: "clamp",
                }),
                offsetAnimation), 0, height))
    }
    return <Animated.View
        style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            zIndex: 1000,
            height: HEADERHIGHT,
            backgroundColor: "#fff",
            transform: [{ translateY: navbarTranslate }]
        }}
        onLayout={onLayout}
    >
    <View>
        
    </View> 
    </Animated.View>
}