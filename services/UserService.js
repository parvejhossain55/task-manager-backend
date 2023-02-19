const User = require("../models/UserModel");

exports.signupService = async (data) => {
    return await User.create(data);
};

exports.getUserByIdService = async (id) => {
    return await User.find({ _id: id });
};

exports.ForgotEmailService = async (email) => {
    return await User.find({ email: email });
};

exports.updateProfileService = async (id, task) => {
    return await User.findOneAndUpdate({ _id: id }, task);
};

exports.verificationCodeUpdateByEmailService = async (email, code) => {
    return await User.findOneAndUpdate({ email: email }, code);
};

exports.checkVerificationCodeService = async ({code, email}) => {
    return await User.aggregate([{$match: {confirmationCode : code, email: email}}, {$group: {_id : "$email", total: {$sum: 1}}}]);
};

exports.checkEmailAndCodeForChangePassword = async ({code, email, password}) => {
    return await User.findOneAndUpdate({confirmationCode : code, email: email}, {password: password});
};

exports.updateProfileService = async (id, task) => {
    return await User.findOneAndUpdate({ _id: id }, task);
};

exports.findByEmailService = async (email) => {
    return await User.findOne({ email });
};
