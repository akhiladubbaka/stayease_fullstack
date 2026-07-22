const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "No Token"
            });

        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        console.log("User from protect:", user);

        req.user = user;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Not Authorized"
        });

    }

};

const adminOnly = (req, res, next) => {

    console.log("req.user in adminOnly:", req.user);

    if (req.user.role !== "admin") {

        return res.status(403).json({
            success: false,
            message: "Access Denied. Admin Only"
        });

    }

    next();

};

module.exports = { protect,adminOnly };