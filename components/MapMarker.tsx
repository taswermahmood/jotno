import { Foundation   } from "@expo/vector-icons";
import { Marker } from "react-native-maps";

export const MapMarker = ({
    lat,
    lon,
    onPress,
    color
}:{
    lat: number,
    lon: number,
    onPress?: () => void;
    color: string;
}) => {
    return <Marker coordinate={{latitude: lat, longitude: lon}} onPress={onPress}>
        <Foundation  name="marker" size={32} color={color}/>
    </Marker>
}