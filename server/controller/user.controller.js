// what happens when routed to the router
const User = require("../models/user.models");
const Club = require("../models/club.models");
const userQueries = require("../queries/user.queries");
const mainQueries = require("../queries/main.queries");
const bcrypt = require('bcrypt');

module.exports = {
    createOneUser : async (req,res) =>
    {
        try {
            console.log('Received user data:', req.body);

            const inClub = await mainQueries.clubs.checkMemberAndRepresentativeUsingEmail(req.body.email, req.body.clubs, req.body.representingClubs);
            if(!inClub){
                res.status(200).json({message: "Wrong club/representative input"});
            }
            else {
                birthDate = Math.floor((new Date() - new Date(req.body.dob).getTime()) / 3.15576e+10) // 3.115576 is miliseconds
                const salt = await bcrypt.genSalt();
                const password = await bcrypt.hash(req.body.passwordHash, salt);
                const user = await userQueries.createOneUser({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    studentId: req.body.studentId,
                    passwordHash: password,
                    dob: req.body.dob,
                    age: birthDate,
                    email: req.body.email,
                    clubs: req.body.clubs,
                    representingClubs: req.body.representingClubs,
                    level: req.body.level,
                    faculty: req.body.faculty,
                    secondFaculty: req.body.secondFaculty,
                    course: req.body.course,
                    year: req.body.year,
                })
                await mainQueries.clubs._linkUserToClubs(user._id, user.clubs, user.representingClubs);
                
                console.log('User successfully created', user);
                res.status(200).json(user);
            }
        }
        catch (error){
            console.error('Error creating user:', error);
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getAllUser : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const user  = await userQueries.getAllUser();
            res.status(200).json(user);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    getOneUser : async (req,res) =>
        {
            try {
                //get id from ref
                //may change this to req.body soon ?
                const {userId}  = req.params;
                const user  = await userQueries.getOneUser(userId);
                if (!user){
                    res.status(500).json({message : `User with id ${userId} not found`});
                }
                res.status(200).json(user);
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateOneUser : async (req,res) =>{
    try {
        //get id from req params instantly
        const {userId}  = req.params;
        const user  = await User.findByIdAndUpdate(userId, req.body);

        if (!user){
            return res.status(500).json({message : `User with id ${userId} not found`});
        }

        const updated = await User.findById(userId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteOneUser : async (req,res) =>{
        try {
            const {userId}  = req.params;
            const user = await User.findByIdAndDelete(userId);
            if (user) {
                await mainQueries.clubs._unlinkUserToClubs(userId, user.clubs, user.representingClubs);
                
                res.status(200).json({message: `deleted user with id: ${userId}`});
            } else {
                res.status(500).json({message : 'User not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    
    login : async (req,res) =>{
        try {
            const user = await User.findOne({ email:req.body.email }).exec();
            if (user) {
                let flag = await bcrypt.compare(req.body.password, user.passwordHash);
                res.status(200).json(flag);
            } else {
                res.status(200).json(false);
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    populateUser : async (req,res) =>{
        try{
            const levelArray = ["Undergraduate", "Postgraduate"];
            const faculties = ["Arts", "Art, Design and Architecture", "Business and Economics", "Education", "Engineering", "IT", "Science", "Law", "Medicine, Nursing and Health Sciences", "Pharmacy and Pharmaceutical Sciences"];
            const undergraduateCourses = [
                "Accounting",
                "Actuarial Science",
                "Actuarial Science and Actuarial Studies",
                "Applied Data Science",
                "Applied Data Science Advanced (Honours)",
                "Architectural Design",
                "Architectural Design and Architecture",
                "Arts",
                "Arts (Honours)",
                "Arts and Criminology",
                "Arts and Fine Art",
                "Arts and Global Studies",
                "Arts and Health Sciences",
                "Arts and Media Communication",
                "Arts and Music",
                "Banking and Finance",
                "Biomedical Science",
                "Biomedical Science (Honours)",
                "Business",
                "Business Administration",
                "Business and Accounting",
                "Business and Arts",
                "Business and Banking and Finance",
                "Business and Information Technology",
                "Business and Marketing",
                "Business and Media Communication",
                "Commerce",
                "Commerce (Honours)",
                "Commerce and Actuarial Science",
                "Commerce and Arts",
                "Commerce and Biomedical Science",
                "Commerce and Computer Science",
                "Commerce and Economics",
                "Commerce and Finance",
                "Commerce and Global Studies",
                "Commerce and Information Technology",
                "Commerce and Music",
                "Commerce and Politics, Philosophy and Economics",
                "Commerce and Science",
                "Computer Science",
                "Computer Science (Honours)",
                "Computer Science Advanced (Honours)",
                "Criminology",
                "Criminology and Information Technology",
                "Design",
                "Design and Arts",
                "Design and Business",
                "Design and Information Technology",
                "Design and Media Communication",
                "Digital Business",
                "Digital Business and Business",
                "Digital Business and Information Technology",
                "Economics",
                "Education (Honours)",
                "Education (Honours) and Arts",
                "Education (Honours) and Business",
                "Education (Honours) and Fine Art",
                "Education (Honours) and Music",
                "Education (Honours) and Science",
                "Engineering (Honours)",
                "Engineering (Honours) and Architectural Design",
                "Engineering (Honours) and Arts",
                "Engineering (Honours) and Biomedical Science",
                "Engineering (Honours) and Commerce",
                "Engineering (Honours) and Computer Science",
                "Engineering (Honours) and Design",
                "Engineering (Honours) and Engineering",
                "Engineering (Honours) and Information Technology",
                "Engineering (Honours) and Pharmaceutical Science",
                "Engineering (Honours) and Science",
                "Finance",
                "Fine Art",
                "Fine Art (Honours)",
                "Fine Art and Business",
                "Fine Art and Information Technology",
                "Fine Art and Media Communication",
                "Global Business",
                "Global Studies",
                "Global Studies and Information Technology",
                "Health Sciences",
                "Health Sciences (Honours)",
                "Information Technology",
                "Information Technology and Arts",
                "Information Technology and Science",
                "International Relations",
                "Laws (Honours)",
                "Laws (Honours) and Arts",
                "Laws (Honours) and Biomedical Science",
                "Laws (Honours) and Commerce",
                "Laws (Honours) and Computer Science",
                "Laws (Honours) and Criminology",
                "Laws (Honours) and Engineering",
                "Laws (Honours) and Global Studies",
                "Laws (Honours) and Information Technology",
                "Laws (Honours) and International Relations",
                "Laws (Honours) and Music",
                "Laws (Honours) and Politics, Philosophy and Economics",
                "Laws (Honours) and Psychology",
                "Laws (Honours) and Science",
                "Learning Design and Technology",
                "Marketing",
                "Marketing and Arts",
                "Marketing and Media Communication",
                "Media Communication",
                "Medical Science (Honours)",
                "Medical Science and Medicine",
                "Music",
                "Music (Honours)",
                "Nursing",
                "Nursing (Honours)",
                "Nursing and Midwifery (Honours)",
                "Nutrition Science",
                "Occupational Therapy (Honours)",
                "Paramedicine",
                "Paramedicine (Honours)",
                "Pharmaceutical Science",
                "Pharmaceutical Science (Honours)",
                "Pharmaceutical Science Advanced (Honours)",
                "Pharmacy (Honours)",
                "Pharmacy",
                "Physiotherapy (Honours)",
                "Politics, Philosophy and Economics",
                "Politics, Philosophy and Economics and Arts",
                "Psychology",
                "Psychology (Honours)",
                "Psychology and Arts",
                "Psychology and Commerce",
                "Psychology and Science",
                "Public Health",
                "Radiation Sciences",
                "Radiography and Medical Imaging (Honours)",
                "Science",
                "Science (Honours)",
                "Science Advanced - Global Challenges (Honours)",
                "Science Advanced - Research (Honours)",
                "Science and Arts",
                "Science and Biomedical Science",
                "Science and Computer Science",
                "Science and Global Studies",
                "Science and Music",
              ];
              const postgraduateCourses = [
                "Accounting",
                "Actuarial Studies",
                "Addictive Behaviours",
                "Advanced Engineering",
                "Advanced Finance",
                "Advanced Health Care Practice",
                "Advanced Nursing",
                "Aeromedical Retrieval",
                "Analytics",
                "Applied Behaviour Analysis",
                "Applied Data Science",
                "Applied Econometrics",
                "Applied Econometrics and Advanced Finance",
                "Applied Linguistics",
                "Applied Marketing",
                "Architecture",
                "Art, Design and Architecture",
                "Artificial Intelligence",
                "Arts",
                "Arts Research Training",
                "Australian Law",
                "Banking and Finance",
                "Behaviour and Systemic Change",
                "Bioethics",
                "Biomedical and Health Science",
                "Biomedical Science",
                "Biostatistics",
                "Biotechnology",
                "Business",
                "Business Administration (Digital)",
                "Business Analytics",
                "Business and Economics",
                "Business and Information Systems",
                "Business Management",
                "Clinical Embryology",
                "Clinical Neuropsychology",
                "Clinical Pharmacy (Aged Care)",
                "Clinical Pharmacy",
                "Clinical Research",
                "Clinical Simulation",
                "Commerce",
                "Communications and Media Studies",
                "Computer Science",
                "Corporate and Financial Regulation",
                "Counselling",
                "Creative Writing",
                "Critical Care Paramedicine",
                "Cultural and Creative Industries",
                "Cybersecurity",
                "Data Science",
                "Design (by Research)",
                "Design",
                "Economic Analytics",
                "Economics",
                "Education",
                "Education Studies",
                "Educational and Developmental Psychology",
                "Educational Leadership",
                "Educational Research",
                "Employment Regulation",
                "Engineering",
                "Engineering Science (Research)",
                "Environment and Sustainability",
                "Epidemiology",
                "Financial Mathematics",
                "Fine Art",
                "Food Science and Agribusiness",
                "Forensic Medicine",
                "Forensic Nursing and Midwifery",
                "Genome Analytics",
                "Geographical Information Science and Technology",
                "Global Business",
                "Global Business and Accounting",
                "Global Business and Advanced Finance",
                "Global Business and Applied Econometrics",
                "Global Business and Applied Marketing",
                "Global Business and Behaviour and Systemic Change",
                "Global Business and Management",
                "Global Business and Regulation and Compliance",
                "Global Executive Business Administration",
                "Global Executive Business Administration and Business",
                "Green Chemistry and Sustainable Technologies",
                "Health Administration",
                "Health Data Analytics",
                "Health Management",
                "Health Profession Education",
                "Health Promotion",
                "Human Resource Management",
                "Human Rights",
                "Information Technology",
                "International Development Practice",
                "International Relations",
                "International Relations and Journalism",
                "International Sustainable Tourism Management",
                "Interpreting and Translation Studies",
                "Journalism",
                "Juris Doctor",
                "Doctor of Philosophy (Law)",
                "Laws",
                "Legal Studies",
                "Magnetic Resonance Imaging",
                "Management",
                "Management and Accounting",
                "Management and Advanced Finance",
                "Management and Applied Marketing",
                "Management and Behaviour and Systemic Change",
                "Management and Regulation and Compliance",
                "Marketing and Digital Communications",
                "Mathematics",
                "Medical Ultrasound",
                "Medicine, Nursing and Health Sciences",
                "Mental Health Sciences",
                "Monash Sustainable Development Institute",
                "Monash University Accident Research Centre",
                "Music",
                "Nursing Practice",
                "Nutrition and Dietetics",
                "Occupational and Environmental Health",
                "Occupational Therapy Practice",
                "Paramedic Practitioner",
                "Perioperative Medicine",
                "Pharmaceutical Science",
                "Pharmacy and Pharmaceutical Sciences",
                "Pharmacy Practice",
                "Science",
                "Philosophy",
                "Education",
                "Physiotherapy",
                "Podiatric Medicine",
                "Professional Accounting",
                "Professional Accounting and Business Law",
                "Professional Certificate of Clinical Simulation",
                "Professional Certificate of Epidemiology",
                "Professional Certificate of Health Professions Education",
                "Professional Certificate of Public Health",
                "Professional Engineering",
                "Professional Psychology",
                "Project Management",
                "Public Health",
                "Public Policy",
                "Radiation Therapy",
                "Regulation and Compliance",
                "Reproductive Sciences",
                "Road Safety",
                "Science",
                "Social Work",
                "Strategic Communications Management",
                "Surgery",
                "Teaching",
                "Technology and Regulation",
                "TESOL",
                "Theatre Performance",
                "Translation Studies",
                "Transport and Mobility Planning",
                "Urban Planning and Design",
                "Wound Care",
                "X-ray Image Interpretation",
              ];
            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            let userArray = [];

            for (let i = 1; i < 451; i++) {
                let level = levelArray[Math.floor(Math.random() * levelArray.length)];
                let faculty = faculties[Math.floor(Math.random() * faculties.length)];
                let secondFaculty = faculties[Math.floor(Math.random() * faculties.length)];
                let course = "";
                if (level == "Undergraduate"){
                    course = undergraduateCourses[Math.floor(Math.random() * undergraduateCourses.length)]
                }
                else {
                    course = postgraduateCourses[Math.floor(Math.random() * postgraduateCourses.length)]
                }
                let salt = await bcrypt.genSalt();
                let password = await bcrypt.hash("clubmem" + i, salt);
                userArray.push({
                    firstName: "club",
                    lastName: "mem" + i,
                    studentId: randomIntFromInterval(11111111, 99999999),
                    passwordHash: password,
                    dob: new Date(),
                    age: randomIntFromInterval(17, 62),
                    email: "clubmem" + i + "@student.monash.edu",
                    clubs: ["66e96f137e1df97dfe38e09b", "66e96f137e1df97dfe38e09c"],
                    representingClubs: [],
                    level: level,
                    faculty: faculty,
                    secondFaculty: secondFaculty,
                    course:  course,
                    year: randomIntFromInterval(1, 4),
                })
            }
            await User.insertMany(userArray).then(function () {
                console.log("Data inserted") 
            }).catch(function (error) {
                console.log(error)     
            });
            const users = await userQueries.getAllUser();
            let memList = [];
            let repList = [];
            for (let i = 0; i < users.length; i ++){
                let user = users[i]
                memList.push(user._id);
                if (user.representingClubs){
                    repList.push(user._id)
                }
                await mainQueries.clubs._linkUserToClubs(user._id, user.clubs, user.representingClubs);
            }
            const club  = await Club.findByIdAndUpdate(req.body.clubId, {
                clubMembers: memList,
                clubRepresentatives: repList
            });
            
            res.status(200).json({message: "done"});

        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    populateClub: async (req,res) =>{
        try{
            const users = await userQueries.getAllUser();
            let memList = [];
            let repList = [];
            for (let i = 0; i < users.length; i ++){
                let user = users[i]
                memList.push(user._id);
                if (user.representingClubs){
                    repList.push(user._id)
                }
            }
            const club  = await Club.findByIdAndUpdate(req.body.clubId, {
                clubMembers: memList,
                clubRepresentatives: repList
            });
            res.status(200).json({message: "done"});
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
}

//or
/*
const User = require("../models/user.models");
const getAllUser = async (req,res) =>
{
    try {
        //use curlies cus find multiple users
        const user  = await User.find({});
        res.status(200).json(user);
    }
    catch (error){
        //status 500 means error
        res.status(500).json({message:error.message});
    }
};

const getOneUser = async (req,res) =>
    {
        try {
            //get id
            const {id}  = req.params;
            const user  = await User.findById(id);
            res.status(200).json(user);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    };

module.exports = {
    getAllUser,
    getOneUser
}
*/