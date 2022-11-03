const { comparePassword, generateToken } = require("../helpers/authHelper");
const {
    signupService,
    getUserByIdService,
    ForgotEmailService,
    verificationCodeUpdateByEmailService,
    checkEmailAndCodeForChangePassword,
    checkVerificationCodeService,
    updateProfileService,
    findByEmailService,
} = require("../services/UserService");
const SendEmailUtility = require("../utils/SendEmailUtility");
const bcrypt = require('bcryptjs');

exports.signupController = async (req, res) => {
    try {
        const user = await signupService(req.body);
        if (user) {
            res.status(200).json({
                status: "Success",
                data: user,
                message: "Successfully Sign Up",
            });
        } else {
            res.status(200).json({
                status: "Failed",
                data: user,
                message: "User Regitration Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            data: error,
            message: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (user) {
            res.status(200).json({
                status: "Success",
                data: user,
                message: "Profile Succesfullyy Updated.",
            });
        } else {
            res.status(500).json({
                status: "Failed",
                data: user,
                message: "Profile Update Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

exports.profileUpdate = async (req, res) => {
    try {
        const user = await updateProfileService(req.params.id, req.body);
        if (user) {
            res.status(200).json({
                status: "Success",
                message: "Profile Succesfullyy Updated.",
            });
        } else {
            res.status(500).json({
                status: "Failed",
                data: user,
                message: "Profile Update Failed",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                status: "Failed",
                error: "Please provide valid email or password",
            });
        }

        const user = await findByEmailService(email);

        if (!user) {
            return res.status(401).json({
                status: "Failed",
                error: "User Not Found",
            });
        }

        const isPasswordValid = comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "Failed",
                error: "Password does not match",
            });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // only workd on https protocol
        });

        res.status(200).json({
            status: "Success",
            message: "Successfully Loged In",
            data: { user, token },
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed to Log in ",
            message: error.message,
        });
    }
};

exports.ForgotEmail = async (req, res) => {
    try {
        const user = await ForgotEmailService(req.params.email);
        // console.log(user[0].email)
        let email = user[0].email;
        let subject = "Forgot Password";
        let code = Math.floor(Math.pow(10, 6 - 1) +Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)).toString()
        let text = `Your verification code is : ${code}`;
        if (email) {
            verificationCodeUpdateByEmailService(email, {confirmationCode: code});

            SendEmailUtility(email, subject, text)
                .then((result) => {
                    if (result) {
                        res.status(200).json({
                            status: "Success",
                            message: "Email Successfully Send",
                            data: result,
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        res.status(200).json({
                            status: "Failed",
                            message: "Failed to Send Email",
                            data: err,
                        });
                    }
                });
        } else {
            res.status(500).json({
                status: "Failed",
                data: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message,
        });
    }
};

exports.verifyUserCode = async (req, res) => {
    try {
        const user = await checkVerificationCodeService(req.body);

        if (user[0].total === 1) {
            res.status(200).json({
                status: "success",
                data: user[0],
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Invalid verification code",
            });
        }
    } catch (error) {
        if (error) {
            res.status(500).json({
                status: "Failed",
                message: error,
            });
        }
    }
};

exports.ChangePassword = async (req, res) => {
    try {
        const { code, email, password } = req.body;

        const hashpass = bcrypt.hashSync(password)

        const data = await checkEmailAndCodeForChangePassword({code: code, email: email, password: hashpass})
        if (data) {
            res.status(200).json({
                status: "success",
                message: "password change and update",
                data: data,
            });
        } else {
            res.status(500).json({
                status: "failed",
                message: "Failed to hash password",
                data: err
            });
        }
        
        
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error,
        });
    }
};
