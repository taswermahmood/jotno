import { Dimensions, StatusBar, Platform } from "react-native";

// CSS CONSTANTS
export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2
export const BORDER_RADIUS = 10;

const baseHeight = 125;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let androidHeight = baseHeight;
let androidNotch = 40;
if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;
androidHeight += androidNotch

export const HEADERHIGHT = Platform.OS === "ios" ? iosHeight : androidHeight

// ENDPOINTS
const serverUrl = "http://10.0.0.240:4000/jotno/api"
const location = "/location"
const locationEndpoint = serverUrl + location

const user = "/user"
const userEndpoint = serverUrl + user
const favoriteEndpoint = (id: number) => `${userEndpoint}/${id}/specialist/favorited`;
const pushTokenEndpoint = (id: number) => `${userEndpoint}/${id}/pushToken`;
const allowsNotificationsEndpoint = (id: number) => `${userEndpoint}/${id}/settings/notifications`;

const jobPost = "/jobPost"
const jobPostEndpoint = serverUrl + jobPost

const specialist = "/specialist"
const specialistEndpoint = serverUrl + specialist

export const endpoints = {
    search: locationEndpoint + "/search",
    autocomplete: locationEndpoint + "/autocomplete",

    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
    facebook: userEndpoint + "/facebook",
    google: userEndpoint + "/google",
    forgotPassword: userEndpoint + "/forgotPassword",
    resetPassword: userEndpoint + "/resetPassword",
    updateUserInformation: userEndpoint + "/updateUserInformation",
    getFavorites: favoriteEndpoint,
    alterFavorites: favoriteEndpoint,
    alterPushToken: pushTokenEndpoint,
    allowNotifications: allowsNotificationsEndpoint,

    getJobPostsById: jobPostEndpoint + "/getJobPostsById/",
    createJobPosts: jobPostEndpoint + "/createJobPosts",
    deleteJobPost: jobPostEndpoint + "/jobPost/",

    getSpecialistById: specialistEndpoint + "/getSpecialistById/",
    getSpecialistByBoundingBox: specialistEndpoint + "/search",
}

// APP ID
export const FACEBOOK_APP_ID = "376557685324796"

export const queryKeys = {
    recentSearches: "recentSearches",
    myJobPosts: "myJobPosts",
    selectedSpecialist: "selectedSpecialist",
    searchedSpecialists: "searchedSpecialists",
    favorited: "favorited"
}