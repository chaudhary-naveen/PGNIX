const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT);
};

const auth = (req, res, next) => {
  try {
    const head = req.headers;
    const token = req.cookies.token || head["authorization"]?.split(" ")[1];

    if(!token) {
      console.log("No token provided");
      return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, process.env.JWT, (err, decoded_data) => {
      if (err) {
        console.log("Invalid token");
        res.send("invalid token");
        return;
      }
      console.log("Token Verified");
      req.user = decoded_data.user;
      console.log(req.user);
      next();
    });
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createToken, auth };
