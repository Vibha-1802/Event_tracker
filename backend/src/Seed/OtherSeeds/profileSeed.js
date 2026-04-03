import { Profile } from "../../Models/profileModel.js"

export const seedProfile = async () => {

    const profile = await Profile.insertMany([
    {
        staffId: "PROF001",
        name: "Dr A",
        age: 35,
        phoneNumber: 9999999991,
        gmail: "a@gmail.com",
        designation: "Prof",
        department: "CSE",
        expertise: ["AI"],
        joiningDate: new Date(),
        photo: "p1.jpg"
    },
    {
        staffId: "PROF002",
        name: "Dr B",
        age: 36,
        phoneNumber: 9999999992,
        gmail: "b@gmail.com",
        designation: "Asst Prof",
        department: "CSE",
        expertise: ["Security"],
        joiningDate: new Date(),
        photo: "p2.jpg"
    },
    {
        staffId: "PROF003",
        name: "Dr C",
        age: 40,
        phoneNumber: 9999999993,
        gmail: "c@gmail.com",
        designation: "Prof",
        department: "IT",
        expertise: ["Cloud"],
        joiningDate: new Date(),
        photo: "p3.jpg"
    },
    {
        staffId: "PROF004",
        name: "Dr D",
        age: 38,
        phoneNumber: 9999999994,
        gmail: "d@gmail.com",
        designation: "HOD",
        department: "ECE",
        expertise: ["IoT"],
        joiningDate: new Date(),
        photo: "p4.jpg"
    }
    ]);
    console.log("Profie seeded");
    return profile;
};
