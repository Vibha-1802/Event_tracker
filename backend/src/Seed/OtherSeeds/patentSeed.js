import { Patent } from "../../Models/patentModel.js"

export const seedPatent = async (users) => {

    const userMap = {};
    users.forEach(u => {
    userMap[u.staffId] = u._id;
    });

    const patent = await Patent.insertMany([
    {
        staff: userMap["PROF001"],
        topic: "AI Patent",
        domain: ["AI"],
        date: new Date(),
        pdf: "pat1.pdf",
        status: "Accepted"
    },
    {
        staff: userMap["PROF002"],
        topic: "Security Patent",
        domain: ["Security"],
        date: new Date(),
        pdf: "pat2.pdf",
        status: "On Hold"
    },
    {
        staff: userMap["PROF003"],
        topic: "Cloud Patent",
        domain: ["Cloud"],
        date: new Date(),
        pdf: "pat3.pdf",
        status: "Grant"
    },
    {
        staff: userMap["PROF004"],
        topic: "DS Patent",
        domain: ["DS"],
        date: new Date(),
        pdf: "pat4.pdf",
        status: "Accepted"
    },
    {
        staff: userMap["PROF001"],
        topic: "IoT Patent",
        domain: ["IoT"],
        date: new Date(),
        pdf: "pat5.pdf",
        status: "On Hold"
    },
    {
        staff: userMap["PROF002"],
        topic: "Blockchain Patent",
        domain: ["Blockchain"],
        date: new Date(),
        pdf: "pat6.pdf",
        status: "Accepted"
    }
    ]);
    console.log("Patent seeded");
    return patent;
};
