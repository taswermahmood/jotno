import { Specialist } from "./profiles/specialist";

export const specialists: Specialist[] = [
    {
        ID: 0,
        avatar: "https://jotno.s3.amazonaws.com/11/Taswer.jpeg",
        images: ["https://img.freepik.com/free-photo/portrait-happy-woman_1303-9879.jpg", "https://i.pinimg.com/736x/d4/53/07/d453076ca0b5fc48989d3c9a2a2fc209.jpg", "https://th.bing.com/th/id/OIP.RczLHpGhBtKxRuaNCKv_KQAAAA?rs=1&pid=ImgDetMain"],
        firstName: "Luke",
        lastName: "William",
        location: "Dhanmondi",
        about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.`,
        experience: 2,
        stars: 3.8,
        lat: 25.80913,
        lon: -80.186363,
        verified: false,
        reviews: [{
            ID: 1,
            specialistID: 0,
            creatorFirstName: "Taswer",
            creatorLastName: "M",
            CreatedAt: "Today",
            stars: 4,
            title: "Great",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        },
        {
            ID: 2,
            specialistID: 0,
            creatorFirstName: "Taswer",
            creatorLastName: "M",
            CreatedAt: "Today",
            stars: 3,
            title: "Great",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        },
        {
            ID: 3,
            specialistID: 0,
            creatorFirstName: "Taswer",
            creatorLastName: "Mahmood",
            CreatedAt: "Today",
            stars: 4,
            title: "Great",
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        }],
        jobs: [{
            ID: 1,
            jobName: "Teaching",
            specialistID: 2,
            frequencies: [{
                name: "Monthly",
                workQuantity: 2,
                workTypes: ["Math", "English"],
                wagePerType: 2000,
                keyWord: "Subject",
                currency: "BDT"
            }, {
                name: "One Time",
                workQuantity: 2,
                workTypes: ["Math", "English"],
                wagePerType: 300,
                keyWord: "Subject",
                currency: "BDT",
            }],
        }],
        posts: [{
            ID: 1,
            specialistID: 0,
            CreatedAt: "Tday",
            caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            ID: 2,
            specialistID: 0,
            CreatedAt: "yesterday",
            caption: "",
            media: "https://img.freepik.com/free-photo/portrait-happy-woman_1303-9879.jpg"
        }
        ]
    },
    // {
    //     ID: 1,
    //     avatar: "https://th.bing.com/th/id/R.d221bbc629e39f163076e402189b35ad?rik=FtKFheY0DhhNIQ&pid=ImgRaw&r=0",
    //     firstName: "Ching",
    //     lastName: "Chang",
    //     location: "Banani",
    //     experience: 5,
    //     currency: "BDT",
    //     favorite: true,

    //     lat: 25.78354,
    //     lon: -80.21391,
    // },
    // {
    //     ID: 2,
    //     avatar: "https://cc-prod.scene7.com/is/image/CCProdAuthor/portrait-photography_P6b_379x392?$pjpeg$&jpegSize=100&wid=378",
    //     firstName: "Luke",
    //     lastName: "William",
    //     location: "Dhanmondi",
    //     experience: 2,
    //     currency: "BDT",
    //     favorite: false,
    //     lat: 40.712776,
    //     lon: -74.005974,
    // },
    // {
    //     ID: 3,
    //     avatar: "https://i.pinimg.com/736x/d4/53/07/d453076ca0b5fc48989d3c9a2a2fc209.jpg",
    //     firstName: "Ching",
    //     lastName: "Chang",
    //     location: "Banani",
    //     experience: 5,

    //     currency: "BDT",
    //     favorite: true,

    //     lat: 40.058323,
    //     lon: -74.405663,
    // },
    // {
    //     ID: 4,
    //     avatar: "https://i.pinimg.com/474x/57/33/eb/5733ebc44f707750e1320010733c312d.jpg",
    //     firstName: "Luke",
    //     lastName: "William",
    //     location: "Dhanmondi",
    //     experience: 2,

    //     currency: "BDT",
    //     favorite: false,

    //     lat: 37.431572,
    //     lon: -78.656891,
    // },
    // {
    //     ID: 5,
    //     avatar: "https://media.istockphoto.com/id/1314415203/photo/always-smile.jpg?s=612x612&w=0&k=20&c=5Khv1DGOjBLVolv1561s5I9BMU3_U2Uvn0dT9yjfje8=",
    //     firstName: "Ching",
    //     lastName: "Chang",
    //     location: "Banani",
    //     experience: 5,

    //     currency: "BDT",
    //     favorite: true,

    //     lat: 25.761681,
    //     lon: -80.191788,
    // },
    // {
    //     ID: 6,
    //     avatar: "https://img.freepik.com/free-photo/portrait-happy-woman_1303-9879.jpg",
    //     firstName: "Luke",
    //     lastName: "William",
    //     location: "Dhanmondi",
    //     experience: 2,

    //     currency: "BDT",
    //     favorite: false,

    //     lat: 25.7804316,
    //     lon: -80.1962652,
    // },
    // {
    //     ID: 7,
    //     avatar: "https://www.allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg",
    //     firstName: "Ching",
    //     lastName: "Chang",
    //     location: "Banani",
    //     experience: 5,

    //     currency: "BDT",
    //     favorite: true,

    //     lat: 25.7804316,
    //     lon: -80.1962652,
    // }
]

export const getSpecialistsInArea = (boundingBox: number[]): Specialist[] => {
    const minLat = boundingBox[0];
    const maxLat = boundingBox[1];
    const minLon = boundingBox[2];
    const maxLon = boundingBox[3];
    const specialistsInArea: Specialist[] = []
    for (let i in specialists) {
        if (
            specialists[i].lat <= maxLat &&
            specialists[i].lat >= minLat &&
            specialists[i].lon <= maxLon &&
            specialists[i].lon >= minLon
        )
            specialistsInArea.push(specialists[i])
    }
    return specialistsInArea;
}