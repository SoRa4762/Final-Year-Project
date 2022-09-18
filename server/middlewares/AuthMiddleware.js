const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  //getting accesstoken from frontend
  const accessToken = req.header("accessToken");
  //checking if they have accesstoken
  if (!accessToken) res.json({ error: "User not logged in!" });
  //cheking if it is valid
  try {
    //validToken is the indirect decoder for us since this has the dcoded version of accessToken with the information of accessToken with it
    const validToken = verify(accessToken, "importantsecret");
    //here we were just sending the data of "decrypted" validToken to whereever this middleware reaches
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
