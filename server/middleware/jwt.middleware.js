const jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {
  jwt.verify(
    request.cookies.usertoken,
    process.env.SECRET_KEY,
    (err, payload) => {
      if (err) {
        response.status(404).json({ verified: false });
      } else {
        console.log("user is authenticated");
        next();
      }
    }
  );
};

module.exports = {
  authenticate,
};
