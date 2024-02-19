import { Dimensions, StatusBar, Platform} from "react-native";

export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN*2
export const BORDER_RADIUS = 10;

const baseHeight = 125;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 40;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch

export const HEADERHIGHT = Platform.OS === "ios" ? iosHeight : androidHeight

const serverUrl = "http://10.0.0.240:4000/jotno/api"

const location = "/location"
const locationEndpoint = serverUrl + location

const user = "/user"
const userEndpoint = serverUrl + user

export const endpoints = {
    search: locationEndpoint + "/search",
    autocomplete: locationEndpoint + "/autocomplete",
    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
}