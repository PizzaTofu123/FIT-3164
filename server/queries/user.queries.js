const User = require("../models/user.models");

module.exports = {
    createOneUser : async (data) => {
        const user = new User(data);
        await user.save();
        return user
    },
    getAllUser : async () => {
        const user = await User.find({});
        return user;
    },
    getOneUser : async (userId) => {
        const user = await User.findById(userId);
        return user;
    },
    
}
