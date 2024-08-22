const UserElectionFlag = require("../models/user.election.flag.models");
const mainQueries = require("./main.queries");

const userElectionFlagQueries = {
    createFlag : async (data) => {
        const flag = new UserElectionFlag(data);
        await flag.save();
        return flag
    },
    getFlag : async (userId, electionId) => {
        const flag = await UserElectionFlag.find({
            userId: userId,
            electionId: electionId
        });
        return flag;
    },
    deleteFlag : async (userId, electionId) => {
        const flag = await UserElectionFlag.deleteOne({
            userId: userId,
            electionId: electionId
        });
        return flag;
    }
    
}

mainQueries.userElectionFlags = userElectionFlagQueries;
module.exports = userElectionFlagQueries;
