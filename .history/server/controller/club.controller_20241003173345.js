// what happens when routed to the router

const Club = require("../models/club.models");
const clubQueries = require("../queries/club.queries");

module.exports = {
    createOneClub : async (req,res) =>
    {
        try {
            const club = await clubQueries.createOneClub({
                clubName: req.body.clubName,
                clubDescription: req.body.clubDescription,
                clubRepresentatives: req.body.clubRepresentatives,
                clubMembers: req.body.clubMembers,
                memberEmailList: req.body.memberEmailList,
                representativeEmailList: req.body.representativeEmailList,
                image: req.body.image,
                electionOngoingFlag: false
            })
            res.status(200).json(club);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },
    getOneClub : async (req,res) =>
        {
            try {
                const {clubId}  = req.params;
                const club  = await clubQueries.getOneClub(clubId);
                if (!club){
                    res.status(500).json({message : `Club with id ${clubId} not found`});
                }
                else{
                    res.status(200).json(club);
                }
            }
            catch (error){
                //status 500 means error
                res.status(500).json({message:error.message});
            }
        },
        
    updateOneClub : async (req,res) =>{
    try {
        //get id from req params instantly
        
        const {clubId}  = req.params;
        const club  = await Club.findByIdAndUpdate(clubId, {
            clubName: req.body.clubName,
            clubDescription: req.body.clubDescription
            });

        if (!club){
            return res.status(500).json({message : `Club with id ${clubId} not found`});
        }

        const updated = await Club.findById(clubId);
        res.status(200).json(updated);
    }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    getAllClub : async (req,res) =>
    {
        try {
            //use curlies cus find multiple users
            const club  = await clubQueries.getAllClub();
            res.status(200).json(club);
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    deleteOneClub : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const club = await clubQueries.deleteOneClub(clubId);
            if (club) {
                res.status(200).json({message: `deleted club with id: ${clubId}`});
            } else {
                res.status(500).json({message : 'Club not found'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    addMember : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.addMember(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `added member with id: ${member}`});
            } else {
                res.status(500).json({message : 'Member not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteMember : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.deleteMember(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `deleted member with id: ${member}`});
            } else {
                res.status(500).json({message : 'Member not deleted'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    addRepresentative : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.addRepresentative(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `added rep with id: ${member}`});
            } else {
                res.status(500).json({message : 'Rep not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    deleteRepresentative : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            const member = await clubQueries.deleteRepresentative(req.body.userId, clubId);
            if (member) {
                res.status(200).json({message: `deleted rep with id: ${member}`});
            } else {
                res.status(500).json({message : 'Rep not added'});
            }
        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },

    startElection : async (req,res) =>{
        try {
            let nowTime = new Date();
            if (nowTime > req.body.electionEndDate) {
                res.status(200).json({message: "end date must be more than now"});
            } else {
                const {clubId}  = req.params;
                const club  = await Club.findByIdAndUpdate(clubId, {
                    electionOngoingFlag: true,
                    electionStartDate: nowTime,
                    electionEndDate: req.body.electionEndDate
                    }).exec();
        
                if (!club){
                    return res.status(500).json({message : `Club with id ${clubId} not found`});
                }
        
                const updated = await Club.findById(clubId);
                res.status(200).json(updated);
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    scheduleElection : async (req,res) =>{
        try {
            if (req.body.electionStartDate > req.body.electionEndDate) {
                res.status(200).json({message: "Start date needs to be earlier than end date"});
            } else {
                const {clubId}  = req.params;
                const club  = await Club.findByIdAndUpdate(clubId, {
                    electionStartDate: req.body.electionStartDate,
                    electionEndDate: req.body.electionEndDate
                    }).exec();
        
                if (!club){
                    return res.status(500).json({message : `Club with id ${clubId} not found`});
                }
        
                const updated = await Club.findById(clubId);
                res.status(200).json(updated);
            }
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    checkElection : async (req,res) =>{
        try {
            await clubQueries.checkScheduleElection();
            await clubQueries.endElection();
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    deleteClubElection : async (req,res) =>{
        try {
            const {clubId}  = req.params;
            await clubQueries.deleteClubElection(clubId);
            res.status(200).json({ message: 'Election deleted successfully', club });
        }
        catch (error){
            //status 500 means error
            res.status(500).json({message:error.message});
        }
    },

    populateClub: async (req,res) =>{
        try{
            const monashClubs = [
                "Super cool club",
                "Upcoming Election Club",
                "Accounting Students' Association, Monash (MASA)",
                "Actuarial Students Society, Monash (MASS)",
                "Advanced Science & Science Scholar Society, Monash (MASS3)",
                "Adventist Students on Campus (ASOC)",
                "Aerospace & Mechanical Engineering Club, Monash (MAMEC)",
                "African Society, Monash (MAfS)",
                "AIESEC Monash",
                "ALP (Labor) Club, Monash (ALP)",
                "Amnesty International Monash (Amnesty)",
                "Anime & Manga Appreciation, Society for (SAMA)",
                "Arab Society, Monash (MARS)",
                "Arts Students, Society of (SAS)",
                "Australia-China Youth Association Monash (ACYA)",
                "Baha'i Society, Monash",
                "Bangladesh Students Association of Monash University (BSAMU)",
                "Big Band, Monash University",
                "Biological Society, Monash",
                "Biomedical Engineering Students' Society, Monash (MBESS)",
                "Biomedical Society, Monash University (Biomed)",
                "Boardgames Society, Monash (MBS)",
                "Business & Commerce Students Society (BCSS)",
                "Cambodian Association, Monash (MCA)",
                "Card Collective, Monash (MCC)",
                "Catholics, Monash",
                "Chemical Engineers, Society for Monash University (SMUCE)",
                "Chemistry Students, Society of (SoCS)",
                "Chess Club, Monash University",
                "Choral Society, Monash University (MonUCS)",
                "Christian Union, Monash (CU)",
                "Civil Engineering Students, Association of (ACES)",
                "Coding, Monash Association of (MAC)",
                "Computing & Commerce Association (CCA)",
                "Creative Writers, Monash",
                "Crochet and Knitting Society, Monash University (MUCKS)",
                "Cyber Security Club, Monash (MonSec)",
                "Debaters Inc., Monash Association of (MAD)",
                "Disney Society, Monash",
                "Economics Students' Society of Australia Monash University (ESSA)",
                "Education and Teachers' Association, Monash",
                "Effective Altruism Monash University",
                "Electrical Engineers, Society of Monash (SMEE)",
                "Electronic Gaming Association, Monash (MEGA)",
                "Embrace Education Inc.",
                "Energy Club, Monash",
                "Engineering & Pharmaceutical Science Society, Monash (MEPSS)",
                "Engineering Students Society, Monash (MESS)",
                "Engineers Without Borders Australia, Monash University Chapter (EWB)",
                "Environmental Engineering Society, Monash University (MEES)",
                "Faculty of IT Society (WIRED)",
                "Fantasy and Sci-Fi Association (FASA)",
                "Film Society, Monash (Film)",
                "Financial Management Association of Australia, Monash University Branch (FMAA)",
                "French Society, Monash (MFS)",
                "German Liechtensteiner Austrian & Swiss Society, Monash University (GLASS)",
                "GLEAM - Queers in STEM",
                "Greens Society, Monash University (MUGS)",
                "Hellenic Students Society Inc., Monash (MHSS)",
                "Humanities and Social Sciences Club (HASS)",
                "Indian Cultural Society, Monash (MICS)",
                "Indonesian Club, Monash",
                "International Affairs Society, Monash (MIAS)",
                "Investing & Trading Monash, University Network for (UNIT)",
                "Islamic Society, Monash University (MUIS)",
                "Italian Club, Monash University",
                "Japanese Club, Monash (MJC)",
                "Jewish Students Society, Monash (MonJSS)",
                "Juggling and Firetwirling, Monash Club of (MCJAF)",
                "Korean Appreciation Student Association (KASA)",
                "Labor Unity Club",
                "Law Students' Society Inc., Monash (LSS)",
                "Liberal Club, Monash University (MULC)",
                "Linguistics Society (LingSoc)",
                "Mahjong Club, Monash (MM)",
                "Malaysian Students Union, Monash University (MUMSU)",
                "Mannix College Student Society Inc. (MCSS)",
                "Marketing Students Society, Monash (MMSS)",
                "Materials Engineering and Science Society (MatES)",
                "Mechatronics Engineering Clayton Club (MECC)",
                "Medical Students Society, Monash University (MUMUS)",
                "Medieval Club, Monash (SCA - College of St Monica)",
                "Monash Hong Kong Student Association Clayton",
                "Muggles, Monash",
                "Music and Theatre Society (MATS)",
                "Neuroscience & Psychology Society, Students (SNAPS)",
                "Nursing Students Society, Clayton (NSS)",
                "Nutrition and Dietetics Society, Monash (MND)",
                "Overseas Christian Fellowship, Monash University (OCF)",
                "Oxfam at Monash",
                "Pakistani Association at Monash (PAM)",
                "Philharmonic Society, Monash University (MUPS)",
                "Philosophy Society, Monash",
                "Physics, Astro & Maths, Society for (SPAM)",
                "Power to Change, Monash (PTC)",
                "Progressive Law Network, Melbourne East Branch (PLN)",
                "Radiation Students' Society Monash (MRSS)",
                "Role Players, Monash University (MURP)",
                "Science Society, Monash (MSS)",
                "Singapore Association of Monash (SAM)",
                "Socio-Economic Engagement & Development, Monash (SEED)",
                "Spanish and Latin American Club (SLAC)",
                "Sri Lankan Cultural Club of Monash University (MUSLCC)",
                "Team MED",
                "Thai Open Community (TOC)",
                "Transport Engineers at Monash (TEM)",
                "Vegan Society, Monash",
                "Vietnamese Students Association (VSA)",
                "Wildfire, Monash University Rural Health Club",
                "Women in Engineering at Monash (WEM)"];              
            function randomIntFromInterval(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            clubArray = []
            for (let i = 0; i < monashClubs.length; i++) {
                clubArray.push({
                    clubName: monashClubs[i],
                    clubDescription: monashClubs[i],
                    clubRepresentatives: [],
                    clubMembers: [],
                    memberEmailList: ["clubmem1@student.monash.edu", "clubmem2@student.monash.edu", "clubmem3@student.monash.edu", "clubmem4@student.monash.edu", "clubmem5@student.monash.edu", "clubmem6@student.monash.edu", "clubmem7@student.monash.edu", "clubmem8@student.monash.edu", "clubmem9@student.monash.edu", "clubmem10@student.monash.edu", "clubmem11@student.monash.edu", "clubmem12@student.monash.edu", "clubmem13@student.monash.edu", "clubmem14@student.monash.edu", "clubmem15@student.monash.edu", "clubmem16@student.monash.edu", "clubmem17@student.monash.edu", "clubmem18@student.monash.edu", "clubmem19@student.monash.edu", "clubmem20@student.monash.edu", "clubmem21@student.monash.edu", "clubmem22@student.monash.edu", "clubmem23@student.monash.edu", "clubmem24@student.monash.edu", "clubmem25@student.monash.edu", "clubmem26@student.monash.edu", "clubmem27@student.monash.edu", "clubmem28@student.monash.edu", "clubmem29@student.monash.edu", "clubmem30@student.monash.edu", "clubmem31@student.monash.edu", "clubmem32@student.monash.edu", "clubmem33@student.monash.edu", "clubmem34@student.monash.edu", "clubmem35@student.monash.edu", "clubmem36@student.monash.edu", "clubmem37@student.monash.edu", "clubmem38@student.monash.edu", "clubmem39@student.monash.edu", "clubmem40@student.monash.edu", "clubmem41@student.monash.edu", "clubmem42@student.monash.edu", "clubmem43@student.monash.edu", "clubmem44@student.monash.edu", "clubmem45@student.monash.edu", "clubmem46@student.monash.edu", "clubmem47@student.monash.edu", "clubmem48@student.monash.edu", "clubmem49@student.monash.edu", "clubmem50@student.monash.edu", "clubmem51@student.monash.edu", "clubmem52@student.monash.edu", "clubmem53@student.monash.edu", "clubmem54@student.monash.edu", "clubmem55@student.monash.edu", "clubmem56@student.monash.edu", "clubmem57@student.monash.edu", "clubmem58@student.monash.edu", "clubmem59@student.monash.edu", "clubmem60@student.monash.edu", "clubmem61@student.monash.edu", "clubmem62@student.monash.edu", "clubmem63@student.monash.edu", "clubmem64@student.monash.edu", "clubmem65@student.monash.edu", "clubmem66@student.monash.edu", "clubmem67@student.monash.edu", "clubmem68@student.monash.edu", "clubmem69@student.monash.edu", "clubmem70@student.monash.edu", "clubmem71@student.monash.edu", "clubmem72@student.monash.edu", "clubmem73@student.monash.edu", "clubmem74@student.monash.edu", "clubmem75@student.monash.edu", "clubmem76@student.monash.edu", "clubmem77@student.monash.edu", "clubmem78@student.monash.edu", "clubmem79@student.monash.edu", "clubmem80@student.monash.edu", "clubmem81@student.monash.edu", "clubmem82@student.monash.edu", "clubmem83@student.monash.edu", "clubmem84@student.monash.edu", "clubmem85@student.monash.edu", "clubmem86@student.monash.edu", "clubmem87@student.monash.edu", "clubmem88@student.monash.edu", "clubmem89@student.monash.edu", "clubmem90@student.monash.edu", "clubmem91@student.monash.edu", "clubmem92@student.monash.edu", "clubmem93@student.monash.edu", "clubmem94@student.monash.edu", "clubmem95@student.monash.edu", "clubmem96@student.monash.edu", "clubmem97@student.monash.edu", "clubmem98@student.monash.edu", "clubmem99@student.monash.edu", "clubmem100@student.monash.edu", "clubmem101@student.monash.edu", "clubmem102@student.monash.edu", "clubmem103@student.monash.edu", "clubmem104@student.monash.edu", "clubmem105@student.monash.edu", "clubmem106@student.monash.edu", "clubmem107@student.monash.edu", "clubmem108@student.monash.edu", "clubmem109@student.monash.edu", "clubmem110@student.monash.edu", "clubmem111@student.monash.edu", "clubmem112@student.monash.edu", "clubmem113@student.monash.edu", "clubmem114@student.monash.edu", "clubmem115@student.monash.edu", "clubmem116@student.monash.edu", "clubmem117@student.monash.edu", "clubmem118@student.monash.edu", "clubmem119@student.monash.edu", "clubmem120@student.monash.edu", "clubmem121@student.monash.edu", "clubmem122@student.monash.edu", "clubmem123@student.monash.edu", "clubmem124@student.monash.edu", "clubmem125@student.monash.edu", "clubmem126@student.monash.edu", "clubmem127@student.monash.edu", "clubmem128@student.monash.edu", "clubmem129@student.monash.edu", "clubmem130@student.monash.edu", "clubmem131@student.monash.edu", "clubmem132@student.monash.edu", "clubmem133@student.monash.edu", "clubmem134@student.monash.edu", "clubmem135@student.monash.edu", "clubmem136@student.monash.edu", "clubmem137@student.monash.edu", "clubmem138@student.monash.edu", "clubmem139@student.monash.edu", "clubmem140@student.monash.edu", "clubmem141@student.monash.edu", "clubmem142@student.monash.edu", "clubmem143@student.monash.edu", "clubmem144@student.monash.edu", "clubmem145@student.monash.edu", "clubmem146@student.monash.edu", "clubmem147@student.monash.edu", "clubmem148@student.monash.edu", "clubmem149@student.monash.edu", "clubmem150@student.monash.edu", "clubmem151@student.monash.edu", "clubmem152@student.monash.edu", "clubmem153@student.monash.edu", "clubmem154@student.monash.edu", "clubmem155@student.monash.edu", "clubmem156@student.monash.edu", "clubmem157@student.monash.edu", "clubmem158@student.monash.edu", "clubmem159@student.monash.edu", "clubmem160@student.monash.edu", "clubmem161@student.monash.edu", "clubmem162@student.monash.edu", "clubmem163@student.monash.edu", "clubmem164@student.monash.edu", "clubmem165@student.monash.edu", "clubmem166@student.monash.edu", "clubmem167@student.monash.edu", "clubmem168@student.monash.edu", "clubmem169@student.monash.edu", "clubmem170@student.monash.edu", "clubmem171@student.monash.edu", "clubmem172@student.monash.edu", "clubmem173@student.monash.edu", "clubmem174@student.monash.edu", "clubmem175@student.monash.edu", "clubmem176@student.monash.edu", "clubmem177@student.monash.edu", "clubmem178@student.monash.edu", "clubmem179@student.monash.edu", "clubmem180@student.monash.edu", "clubmem181@student.monash.edu", "clubmem182@student.monash.edu", "clubmem183@student.monash.edu", "clubmem184@student.monash.edu", "clubmem185@student.monash.edu", "clubmem186@student.monash.edu", "clubmem187@student.monash.edu", "clubmem188@student.monash.edu", "clubmem189@student.monash.edu", "clubmem190@student.monash.edu", "clubmem191@student.monash.edu", "clubmem192@student.monash.edu", "clubmem193@student.monash.edu", "clubmem194@student.monash.edu", "clubmem195@student.monash.edu", "clubmem196@student.monash.edu", "clubmem197@student.monash.edu", "clubmem198@student.monash.edu", "clubmem199@student.monash.edu", "clubmem200@student.monash.edu", "clubmem201@student.monash.edu", "clubmem202@student.monash.edu", "clubmem203@student.monash.edu", "clubmem204@student.monash.edu", "clubmem205@student.monash.edu", "clubmem206@student.monash.edu", "clubmem207@student.monash.edu", "clubmem208@student.monash.edu", "clubmem209@student.monash.edu", "clubmem210@student.monash.edu", "clubmem211@student.monash.edu", "clubmem212@student.monash.edu", "clubmem213@student.monash.edu", "clubmem214@student.monash.edu", "clubmem215@student.monash.edu", "clubmem216@student.monash.edu", "clubmem217@student.monash.edu", "clubmem218@student.monash.edu", "clubmem219@student.monash.edu", "clubmem220@student.monash.edu", "clubmem221@student.monash.edu", "clubmem222@student.monash.edu", "clubmem223@student.monash.edu", "clubmem224@student.monash.edu", "clubmem225@student.monash.edu", "clubmem226@student.monash.edu", "clubmem227@student.monash.edu", "clubmem228@student.monash.edu", "clubmem229@student.monash.edu", "clubmem230@student.monash.edu", "clubmem231@student.monash.edu", "clubmem232@student.monash.edu", "clubmem233@student.monash.edu", "clubmem234@student.monash.edu", "clubmem235@student.monash.edu", "clubmem236@student.monash.edu", "clubmem237@student.monash.edu", "clubmem238@student.monash.edu", "clubmem239@student.monash.edu", "clubmem240@student.monash.edu", "clubmem241@student.monash.edu", "clubmem242@student.monash.edu", "clubmem243@student.monash.edu", "clubmem244@student.monash.edu", "clubmem245@student.monash.edu", "clubmem246@student.monash.edu", "clubmem247@student.monash.edu", "clubmem248@student.monash.edu", "clubmem249@student.monash.edu", "clubmem250@student.monash.edu", "clubmem251@student.monash.edu", "clubmem252@student.monash.edu", "clubmem253@student.monash.edu", "clubmem254@student.monash.edu", "clubmem255@student.monash.edu", "clubmem256@student.monash.edu", "clubmem257@student.monash.edu", "clubmem258@student.monash.edu", "clubmem259@student.monash.edu", "clubmem260@student.monash.edu", "clubmem261@student.monash.edu", "clubmem262@student.monash.edu", "clubmem263@student.monash.edu", "clubmem264@student.monash.edu", "clubmem265@student.monash.edu", "clubmem266@student.monash.edu", "clubmem267@student.monash.edu", "clubmem268@student.monash.edu", "clubmem269@student.monash.edu", "clubmem270@student.monash.edu", "clubmem271@student.monash.edu", "clubmem272@student.monash.edu", "clubmem273@student.monash.edu", "clubmem274@student.monash.edu", "clubmem275@student.monash.edu", "clubmem276@student.monash.edu", "clubmem277@student.monash.edu", "clubmem278@student.monash.edu", "clubmem279@student.monash.edu", "clubmem280@student.monash.edu", "clubmem281@student.monash.edu", "clubmem282@student.monash.edu", "clubmem283@student.monash.edu", "clubmem284@student.monash.edu", "clubmem285@student.monash.edu", "clubmem286@student.monash.edu", "clubmem287@student.monash.edu", "clubmem288@student.monash.edu", "clubmem289@student.monash.edu", "clubmem290@student.monash.edu", "clubmem291@student.monash.edu", "clubmem292@student.monash.edu", "clubmem293@student.monash.edu", "clubmem294@student.monash.edu", "clubmem295@student.monash.edu", "clubmem296@student.monash.edu", "clubmem297@student.monash.edu", "clubmem298@student.monash.edu", "clubmem299@student.monash.edu", "clubmem300@student.monash.edu", "clubmem301@student.monash.edu", "clubmem302@student.monash.edu", "clubmem303@student.monash.edu", "clubmem304@student.monash.edu", "clubmem305@student.monash.edu", "clubmem306@student.monash.edu", "clubmem307@student.monash.edu", "clubmem308@student.monash.edu", "clubmem309@student.monash.edu", "clubmem310@student.monash.edu", "clubmem311@student.monash.edu", "clubmem312@student.monash.edu", "clubmem313@student.monash.edu", "clubmem314@student.monash.edu", "clubmem315@student.monash.edu", "clubmem316@student.monash.edu", "clubmem317@student.monash.edu", "clubmem318@student.monash.edu", "clubmem319@student.monash.edu", "clubmem320@student.monash.edu", "clubmem321@student.monash.edu", "clubmem322@student.monash.edu", "clubmem323@student.monash.edu", "clubmem324@student.monash.edu", "clubmem325@student.monash.edu", "clubmem326@student.monash.edu", "clubmem327@student.monash.edu", "clubmem328@student.monash.edu", "clubmem329@student.monash.edu", "clubmem330@student.monash.edu", "clubmem331@student.monash.edu", "clubmem332@student.monash.edu", "clubmem333@student.monash.edu", "clubmem334@student.monash.edu", "clubmem335@student.monash.edu", "clubmem336@student.monash.edu", "clubmem337@student.monash.edu", "clubmem338@student.monash.edu", "clubmem339@student.monash.edu", "clubmem340@student.monash.edu", "clubmem341@student.monash.edu", "clubmem342@student.monash.edu", "clubmem343@student.monash.edu", "clubmem344@student.monash.edu", "clubmem345@student.monash.edu", "clubmem346@student.monash.edu", "clubmem347@student.monash.edu", "clubmem348@student.monash.edu", "clubmem349@student.monash.edu", "clubmem350@student.monash.edu", "clubmem351@student.monash.edu", "clubmem352@student.monash.edu", "clubmem353@student.monash.edu", "clubmem354@student.monash.edu", "clubmem355@student.monash.edu", "clubmem356@student.monash.edu", "clubmem357@student.monash.edu", "clubmem358@student.monash.edu", "clubmem359@student.monash.edu", "clubmem360@student.monash.edu", "clubmem361@student.monash.edu", "clubmem362@student.monash.edu", "clubmem363@student.monash.edu", "clubmem364@student.monash.edu", "clubmem365@student.monash.edu", "clubmem366@student.monash.edu", "clubmem367@student.monash.edu", "clubmem368@student.monash.edu", "clubmem369@student.monash.edu", "clubmem370@student.monash.edu", "clubmem371@student.monash.edu", "clubmem372@student.monash.edu", "clubmem373@student.monash.edu", "clubmem374@student.monash.edu", "clubmem375@student.monash.edu", "clubmem376@student.monash.edu", "clubmem377@student.monash.edu", "clubmem378@student.monash.edu", "clubmem379@student.monash.edu", "clubmem380@student.monash.edu", "clubmem381@student.monash.edu", "clubmem382@student.monash.edu", "clubmem383@student.monash.edu", "clubmem384@student.monash.edu", "clubmem385@student.monash.edu", "clubmem386@student.monash.edu", "clubmem387@student.monash.edu", "clubmem388@student.monash.edu", "clubmem389@student.monash.edu", "clubmem390@student.monash.edu", "clubmem391@student.monash.edu", "clubmem392@student.monash.edu", "clubmem393@student.monash.edu", "clubmem394@student.monash.edu", "clubmem395@student.monash.edu", "clubmem396@student.monash.edu", "clubmem397@student.monash.edu", "clubmem398@student.monash.edu", "clubmem399@student.monash.edu", "clubmem400@student.monash.edu"],
                    representativeEmailList: ["clubrep@student.monash.edu", "clubrep1@student.monash.edu", "clubrep2@student.monash.edu", "clubrep3@student.monash.edu", "clubrep4@student.monash.edu", "clubrep5@student.monash.edu", "clubrep6@student.monash.edu", "clubrep7@student.monash.edu", "clubrep8@student.monash.edu", "clubrep9@student.monash.edu", "clubrep10@student.monash.edu"],
                    electionOngoingFlag: false
                })
            }
            await Club.insertMany(clubArray).then(function () {
                console.log("Data inserted") 
            }).catch(function (error) {
                console.log(error)     
            });
            res.status(200).json({message: "done"});

        }
        catch (error){
            res.status(500).json({message:error.message});
        }
    },
}

