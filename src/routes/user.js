const {
    signupController,
    getUserById,
    ForgotEmail,
    verifyUserCode,
    ChangePassword,
    profileUpdate,
    loginController,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/signup", signupController);
router.get("/user/:id", getUserById);
router.put("/profileUpdate/:id", profileUpdate);
router.post("/login", loginController);

// forgot password
router.get("/user/forgot/:email", ForgotEmail);
router.post("/user/verifycode", verifyUserCode);
router.post("/user/changePassword", ChangePassword);

module.exports = router;
