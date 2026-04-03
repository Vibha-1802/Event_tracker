import { Paper } from "../../Models/paperModel.js"

export const seedPaper = async (users) => {

    const userMap = {};
    users.forEach(u => {
    userMap[u.staffId] = u._id;
    });

    const paper = await Paper.insertMany([
    {
        staff: userMap["PROF001"],
        topic: "AI Paper",
        domain: ["AI"],
        eventDates: [new Date()],
        eventName: "IEEE",
        location: "Bangalore",
        publisher: "IEEE",
        pdf: "p1.pdf",
        status: "Published"
    },
    {
        staff: userMap["PROF002"],
        topic: "Security Paper",
        domain: ["Security"],
        eventDates: [new Date()],
        eventName: "CyberConf",
        location: "Delhi",
        publisher: "Springer",
        pdf: "p2.pdf",
        status: "On Hold"
    },
    {
        staff: userMap["PROF003"],
        topic: "Cloud Paper",
        domain: ["Cloud"],
        eventDates: [new Date()],
        eventName: "CloudExpo",
        location: "Mumbai",
        publisher: "Elsevier",
        pdf: "p3.pdf",
        status: "Grant"
    },
    {
        staff: userMap["PROF004"],
        topic: "DS Paper",
        domain: ["DS"],
        eventDates: [new Date()],
        eventName: "DS Conf",
        location: "Chennai",
        publisher: "IEEE",
        pdf: "p4.pdf",
        status: "Published"
    },
    {
        staff: userMap["PROF001"],
        topic: "IoT Paper",
        domain: ["IoT"],
        eventDates: [new Date()],
        eventName: "IoT Summit",
        location: "Hyderabad",
        publisher: "ACM",
        pdf: "p5.pdf",
        status: "On Hold"
    },
    {
        staff: userMap["PROF002"],
        topic: "Blockchain Paper",
        domain: ["Blockchain"],
        eventDates: [new Date()],
        eventName: "BlockConf",
        location: "Pune",
        publisher: "IEEE",
        pdf: "p6.pdf",
        status: "Published"
    }
    ]);
    console.log("Paper seeded");
    return paper;
};
