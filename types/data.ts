import { Profile } from "./profile";

export const profiles: Profile[] = [
    {
        id: 0,
        avatar: "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain",
        firstName: "Luke",
        lastName: "William",
        location: "Dhanmondi",
        experience: 2,
        wage: 250,
        wageFrequency: "per day",
        currency: "BDT",
        favorite: false,
        tag: ["Housekeeping"],
        lat: 25.80913,
        lon: -80.186363,
    },
    {
        id: 1,
        avatar: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
        firstName: "Ching",
        lastName: "Chang",
        location: "Banani",
        experience: 5,
        wage: 6000,
        wageFrequency: "per month",
        currency: "BDT",
        favorite: true,
        tag: ["Tutor"],
        lat: 25.78354,
        lon: -80.21391,
    },
    {
        id: 2,
        avatar: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
        firstName: "Luke",
        lastName: "William",
        location: "Dhanmondi",
        experience: 2,
        wage: 250,
        wageFrequency: "per day",
        currency: "BDT",
        favorite: false,
        tag: ["Housekeeping"],
        lat: 40.712776,
        lon: -74.005974,
    },
    {
        id: 3,
        avatar: "https://i.pinimg.com/736x/d4/53/07/d453076ca0b5fc48989d3c9a2a2fc209.jpg",
        firstName: "Ching",
        lastName: "Chang",
        location: "Banani",
        experience: 5,
        wage: 6000,
        wageFrequency: "per month",
        currency: "BDT",
        favorite: true,
        tag: ["Tutor"],
        lat: 40.058323,
        lon: -74.405663,
    },
    {
        id: 4,
        avatar: "https://i.pinimg.com/474x/57/33/eb/5733ebc44f707750e1320010733c312d.jpg",
        firstName: "Luke",
        lastName: "William",
        location: "Dhanmondi",
        experience: 2,
        wage: 250,
        wageFrequency: "per day",
        currency: "BDT",
        favorite: false,
        tag: ["Housekeeping"],
        lat: 37.431572,
        lon: -78.656891,
    },
    {
        id: 5,
        avatar: "https://media.istockphoto.com/id/1314415203/photo/always-smile.jpg?s=612x612&w=0&k=20&c=5Khv1DGOjBLVolv1561s5I9BMU3_U2Uvn0dT9yjfje8=",
        firstName: "Ching",
        lastName: "Chang",
        location: "Banani",
        experience: 5,
        wage: 6000,
        wageFrequency: "per month",
        currency: "BDT",
        favorite: true,
        tag: ["Tutor"],
        lat: 25.761681,
        lon: -80.191788,
    },
    {
        id: 6,
        avatar: "https://img.freepik.com/free-photo/portrait-happy-woman_1303-9879.jpg",
        firstName: "Luke",
        lastName: "William",
        location: "Dhanmondi",
        experience: 2,
        wage: 250,
        wageFrequency: "per day",
        currency: "BDT",
        favorite: false,
        tag: ["Housekeeping"],
        lat: 25.7804316,
        lon: -80.1962652,
    },
    {
        id: 7,
        avatar: "https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg",
        firstName: "Ching",
        lastName: "Chang",
        location: "Banani",
        experience: 5,
        wage: 6000,
        wageFrequency: "per month",
        currency: "BDT",
        favorite: true,
        tag: ["Tutor"],
        lat: 25.7804316,
        lon: -80.1962652,
    }
]

export const getProfilesInArea = (boundingBox: number[]): Profile[] => {
    const minLat = boundingBox[0];
    const maxLat = boundingBox[1];
    const minLon= boundingBox[2];
    const maxLon = boundingBox[3];
    const profilesInArea: Profile[] = []
    for (let i in profiles) {
      if (
        profiles[i].lat <= maxLat &&
        profiles[i].lat >= minLat &&
        profiles[i].lon <= maxLon &&
        profiles[i].lon >= minLon 
      ) 
      profilesInArea.push(profiles[i])
    }
    return profilesInArea;
  }