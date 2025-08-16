const User = require("../Models/User");

// Middleware to check owner role
const isOwner = async (req, res, next) => {
  try {
    // bhai userId hmko request me token se mil jayegi
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized user , User not logged in" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "owner") {
      return res
        .status(403)
        .json({ message: "Access denied: Only owners allowed" });
    }

    next(); // ✅ Owner hai toh route continue karega
  } catch (error) {
    console.error("isOwner middleware error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = isOwner;
