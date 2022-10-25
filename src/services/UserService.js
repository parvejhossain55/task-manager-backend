const User = require("../models/UserModel");

exports.signupService = async (data) => {
    const user = await User.create(data);
    return user;
};

exports.updateProfileService = async (id, task) => {
    return await User.findOneAndUpdate({ _id: id }, task);
};

exports.findByEmailService = async (email) => {
    return await User.findOne({ email });
};
