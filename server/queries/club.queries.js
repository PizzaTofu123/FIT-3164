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
        const club = await Candidate.findByIdAndDelete(clubId).exec();
        /*if (club) {
            for(let voteId of candidate.votes){
                await mainQueries.votes.deleteOneVote(voteId);
            }
            return candidate;
        } else {
            return null;
        }*/
    }
}

mainQueries.clubs = clubQueries;
module.exports = clubQueries;