import { Fdp } from "../../Models/fdpModel.js"

export const seedFdp = async (users) => {

    const userMap = {};
    users.forEach(u => {
    userMap[u.staffId] = u._id;
    });

    const fdp = await Fdp.insertMany([
    {
        staff: userMap["PROF001"],
        topic: "AI Workshop",
        skillsGained: ["ML", "AI"],
        dates: [new Date()],
        certificate: "cert1.pdf",
        photos: ["img1.jpg"]
    },
    {
        staff: userMap["PROF002"],
        topic: "Cybersecurity FDP",
        skillsGained: ["Security"],
        dates: [new Date()],
        certificate: "cert2.pdf",
        photos: ["img2.jpg"]
    },
    {
        staff: userMap["PROF003"],
        topic: "Cloud FDP",
        skillsGained: ["AWS"],
        dates: [new Date()],
        certificate: "cert3.pdf",
        photos: ["img3.jpg"]
    },
    {
        staff: userMap["PROF004"],
        topic: "Data Science FDP",
        skillsGained: ["Python"],
        dates: [new Date()],
        certificate: "cert4.pdf",
        photos: ["img4.jpg"]
    },
    {
        staff: userMap["PROF001"],
        topic: "IoT FDP",
        skillsGained: ["Sensors"],
        dates: [new Date()],
        certificate: "cert5.pdf",
        photos: ["img5.jpg"]
    },
    {
        staff: userMap["PROF002"],
        topic: "Blockchain FDP",
        skillsGained: ["Blockchain"],
        dates: [new Date()],
        certificate: "cert6.pdf",
        photos: ["img6.jpg"]
    }
    ]);
    console.log("Fdp seeded");
    return fdp;
};
