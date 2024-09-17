const Club = require("../models/club.models");
const User = require("../models/user.models");
const mainQueries = require("./main.queries");

const clubQueries = {
    createOneClub : async (data) => {
        const club = new Club(data);
        await club.save();
        return club;
    },
    
    getAllClub : async () => {
        const club = await Club.find({});
        return club;
    },

    getOneClub : async (clubId) => {
        const club = await Club.findById(clubId);
        return club;
    },

    deleteOneClub : async (clubId) =>{
        const club = await Club.findByIdAndDelete(clubId).exec();
        const mem = club.clubMembers;
        for(let userId of mem){
            await User.updateMany(
                { _id:  userId },
                { $pull: { representingClubs: clubId, clubs: clubId } }
            ).exec();
        }
        
    },
    async addMember(userId, clubId){
        await Club.updateMany(
            { _id:  clubId },
            { $addToSet: { clubMembers: userId } }
        ).exec();
        return userId;
    },

    async deleteMember(userId, clubId){
        await Club.updateMany(
            { _id:  clubId },
            { $pull: { clubMembers: userId } }
        ).exec();
        return userId;
    },
    
    async addRepresentative(userId, clubId){
        await Club.updateMany(
            { _id:  clubId },
            { $addToSet: { clubRepresentatives: userId } }
        ).exec();
        await this.addMember(userId, clubId);
        return userId;
    },

    async deleteRepresentative(userId, clubId){
        await Club.updateMany(
            { _id:  clubId },
            { $pull: { clubRepresentatives: userId } }
        ).exec();
        await this.deleteMember(userId, clubId);
        return userId;
    },
    
    checkMemberAndRepresentativeUsingEmail : async (email, clubs=[], Rclubs=[]) => {
        for(let clubId of clubs){
            const club = await mainQueries.clubs.getOneClub(clubId);
            let emailList = club.memberEmailList;
            if (emailList){
                if (!emailList.includes(email)){
                    return false
                }
                await mainQueries.clubs.addMember()
            }
            else {
                return false
            }
        }
        for(let clubId of Rclubs){
            const club = await mainQueries.clubs.getOneClub(clubId);
            let emailList = club.representativeEmailList;
            if (emailList){
                if (!emailList.includes(email)){
                    return false
                }
            }
            else {
                return false
            }
        }
        return true
    },

    _linkUserToClubs : async (userId, clubs =[], Rclubs =[]) => {
        for(let clubId of clubs){
            await mainQueries.clubs.addMember(userId,clubId);
        }
        for(let clubId of Rclubs){
            await mainQueries.clubs.addRepresentative(userId,clubId);
        }
    },

    _unlinkUserToClubs : async (userId, clubs =[], Rclubs =[]) => {
        for(let clubId of clubs){
            await mainQueries.clubs.deleteMember(userId,clubId);
        }
        for(let clubId of Rclubs){
            await mainQueries.clubs.deleteRepresentative(userId,clubId);
        }
    },

    _linkElectionToClubs : async (electionId, clubId) => {
        await Club.updateMany(
            { _id:  clubId },
            { $addToSet: { elections: electionId } }
        ).exec();
    },

    _unlinkElectionToClubs  : async (electionId, clubId) => {
        await Club.updateMany(
            { _id:  clubId },
            { $pull: { elections: electionId } }
        ).exec();
    },

    endElection  : async () => {
        const d = new Date();
        await Club.updateMany(
            { electionEndDate:  {$lt : d.getTime()
            }},
            { electionOngoingFlag: false, electionStartDate: null, electionEndDate: null }
        ).exec();
    },

    checkScheduleElection  : async () => {
        const d = new Date();
        await Club.updateMany(
            {   
                electionStartDate:  {$lt : d.getTime()}},
            { electionOngoingFlag: true, electionStartDate: null, electionEndDate: null }
        ).exec();
    },
}

mainQueries.clubs = clubQueries;
module.exports = clubQueries;