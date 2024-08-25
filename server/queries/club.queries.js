const Club = require("../models/club.models");
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
    }
}

mainQueries.clubs = clubQueries;
module.exports = clubQueries;