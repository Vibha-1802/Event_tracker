import { SocialService } from "../../Models/socialServiceModel.js"

export const seedSocialService = async (users) => {

    const userMap = {};
    users.forEach(u => {
    userMap[u.staffId] = u._id;
    });

    const socialService = await SocialService.insertMany([
    {
        staff: userMap["PROF001"],
        dates: [new Date()],
        location: "Village A",
        certificate: "c1.pdf",
        photos: ["img1.jpg"]
    },
    {
        staff: userMap["PROF002"],
        dates: [new Date()],
        location: "Village B",
        certificate: "c2.pdf",
        photos: ["img2.jpg"]
    },
    {
        staff: userMap["PROF003"],
        dates: [new Date()],
        location: "Village C",
        certificate: "c3.pdf",
        photos: ["img3.jpg"]
    },
    {
        staff: userMap["PROF004"],
        dates: [new Date()],
        location: "Village D",
        certificate: "c4.pdf",
        photos: ["img4.jpg"]
    },
    {
        staff: userMap["PROF001"],
        dates: [new Date()],
        location: "Village E",
        certificate: "c5.pdf",
        photos: ["img5.jpg"]
    },
    {
        staff: userMap["PROF002"],
        dates: [new Date()],
        location: "Village F",
        certificate: "c6.pdf",
        photos: ["img6.jpg"]
    }
    ]);
    console.log("Social Service seeded");
    return socialService;
};
