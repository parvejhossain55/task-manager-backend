const { comparePassword, generateToken } = require("../helpers/authHelper");
const {
    signupService,
    getUserByIdService,
    getUserByEmailService,
    updateProfileService,
    findByEmailService,
} = require("../services/UserService");

exports.signupController = async (req, res) => {
    try {

        const user = await signupService(req.body);
        if(user) {
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
        if(user) {
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

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await getUserByEmailService(req.params.email);
        if(user) {
            res.status(200).json({
                status: "Success",
                data: user,
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

exports.profileUpdate = async (req, res) => {
    try {
        const user = await updateProfileService(req.params.id, req.body);
        if(user) {
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
            secure: true  // only workd on https protocol
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
