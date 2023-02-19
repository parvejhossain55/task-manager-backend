const { expressjwt } = require("express-jwt");

exports.isAuthenticated = expressjwt({
    secret: "safsdfas34324rghjfg657543",
    algorithms: ["HS256"],
});
