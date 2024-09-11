const User = require("../models/user.models");
const mainQueries = require("./main.queries");

const userQueries = {
    createOneUser : async (data) => {
        try {
            const user = new User(data);
            await user.save();
            return user;
        } catch (error) {
            throw new Error('Error creating user');
        }
    },
    getAllUser : async () => {
        const user = await User.find({});
        return user;
    },
    getOneUser : async (userId) => {
        const user = await User.findById(userId);
        return user;
    }
}

mainQueries.users = userQueries;
module.exports = userQueries;