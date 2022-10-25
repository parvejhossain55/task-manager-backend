const {
    signupController,
    profileUpdate,
    loginController,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/signup", signupController);
router.put("/profileUpdate/:id", profileUpdate)
router.post("/login", loginController);
router.get("/me", isAuthenticated, (req, res) => {
    res.json({
        status: "succes",
    });
});

module.exports = router;
