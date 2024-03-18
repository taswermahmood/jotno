import { Dimensions, StatusBar, Platform } from "react-native";

// OPTIONS
export const MENU_OPTIONS = [
    { name: "Pet Care", jobName: "petCare", animationSpeed: 0.6, url: require("@/assets/lotties/petCareLogo.json")},
    { name: "Teacher", jobName: "teaching", animationSpeed: 0.3, url: require("@/assets/lotties/teachingLogo.json")},
    // { name: "House Keeper", jobName: "houseKeeping", animationSpeed: 1, url: require("@/assets/lotties/houseKeepingLogo.json")},
    // { name: "Baby Sitter", jobName: "babySitting", animationSpeed: 0.8, url: require("@/assets/lotties/babySittingLogo.json")},
    // { name: "Elderly Care", jobName: "elderlyCare", animationSpeed: 1, url: require("@/assets/lotties/elderlyCareLogo.json")},
]

// CSS CONSTANTS
export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - LISTMARGIN * 2
export const BORDER_RADIUS = 10;
export const BUTTON_BORDER_RADIUS = 50;

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
const chatUrl = "http://10.0.0.240:3000";

const location = "/location"
const locationEndpoint = serverUrl + location

const user = "/user"
const userEndpoint = serverUrl + user

const userUpdateEndpoint = (id: number) => `${userEndpoint}/updateUserInformation?id=${id}`;
const favoriteEndpoint = (id: number) => `${userEndpoint}/specialist/favorited?id=${id}`;
const pushTokenEndpoint = (id: number) => `${userEndpoint}/pushToken?id=${id}`;
const allowsNotificationsEndpoint = (id: number) => `${userEndpoint}/settings/notifications?id=${id}`;

const jobPost = "/jobPost"
const jobPostEndpoint = serverUrl + jobPost
const jobPostGetByUserEndpoint = (userId?: number) => `${jobPostEndpoint}/getJobPosts?id=${userId}`;
const jobPostCreateEndpoint = (userId?: number) => `${jobPostEndpoint}/createJobPosts?id=${userId}`;
const jobPostDeleteEndpoint = (jobId: number, userId?: number) => `${jobPostEndpoint}/deleteJobPost?id=${userId}&jobId=${jobId}`;

const specialist = "/specialist"
const specialistEndpoint = serverUrl + specialist
const specialistByBoundingBoxEndpoint = (userId?: number) => `${specialistEndpoint}/search?id=${userId}`
const specialistJobNameEndpoint = (specialistId: number, jobName: string, userId?: number) => `${specialistEndpoint}/getSpecialist?id=${userId}&jobName=${jobName}&specialistId=${specialistId}`;

const chat = "/chat";
const chatEndpoint = serverUrl + chat;
const createChatEndpoint = (id?: number) => `${chatEndpoint}/create?id=${id}`;
const openChatEndpoint = (id?: number) => `${chatEndpoint}/open?id=${id}`;
const getChatByIDEndpoint = (chatId: number, id?: number) => `${chatEndpoint}/getChat?id=${id}&chatId=${chatId}`;
const getChatsByUserEndpoint = (id?: number) => `${chatEndpoint}/getChats?id=${id}`;

const messages = "/messages";
const messagesEndpoint = serverUrl + messages;
const createMessageEndpoint = (userId?: number) => `${messagesEndpoint}/create?id=${userId}`

const bookings = "/booking";
const bookingsEndpoint = serverUrl + bookings;
const getBookingEndpoint = (userId?: number) => `${bookingsEndpoint}/getBookingByUser?id=${userId}`
const createBookingEndpoint = (userId?: number) => `${bookingsEndpoint}/create?id=${userId}`
const cancelBookingEndpoint = (userId?: number) => `${bookingsEndpoint}/cancelBooking?id=${userId}`
const getPendingPaymentsByBookingIdEndpoint = (userId?: number) => `${bookingsEndpoint}/getPendingPaymentsByBookingID?id=${userId}`

const refresh = "/refresh";
const refreshEndpoint = serverUrl + refresh;

export const endpoints = {
    chat: chatUrl,

    search: locationEndpoint + "/search",
    autocomplete: locationEndpoint + "/autocomplete",

    register: userEndpoint + "/register",
    login: userEndpoint + "/login",
    facebook: userEndpoint + "/facebook",
    google: userEndpoint + "/google",
    forgotPassword: userEndpoint + "/forgotPassword",
    resetPassword: userEndpoint + "/resetPassword",

    updateUserInformation: userUpdateEndpoint,
    getFavorites: favoriteEndpoint,
    alterFavorites: favoriteEndpoint,
    alterPushToken: pushTokenEndpoint,
    allowNotifications: allowsNotificationsEndpoint,

    getJobPostsById: jobPostGetByUserEndpoint,
    createJobPosts: jobPostCreateEndpoint,
    deleteJobPost: jobPostDeleteEndpoint,

    getSpecialistByBoundingBox: specialistByBoundingBoxEndpoint,
    getSpecialistById: specialistJobNameEndpoint,

    createChat: createChatEndpoint,
    openCoversation: openChatEndpoint,
    getChatByID: getChatByIDEndpoint,
    getChatsByUserID: getChatsByUserEndpoint,

    createMessage: createMessageEndpoint,

    getBookingByUserID: getBookingEndpoint,
    createBooking: createBookingEndpoint,
    cancelBooking: cancelBookingEndpoint,
    getPendingPaymentsByBookingId: getPendingPaymentsByBookingIdEndpoint,

    refreshToken: refreshEndpoint
}

// APP ID
export const FACEBOOK_APP_ID = "376557685324796"

export const queryKeys = {
    recentSearches: "recentSearches",
    myJobPosts: "myJobPosts",
    myBookings: "myBookings",
    selectedSpecialist: "selectedSpecialist",
    searchedSpecialists: "searchedSpecialists",
    favorited: "favorited",
    chats: "chats",
    selectedChat: "selectedChat"
}