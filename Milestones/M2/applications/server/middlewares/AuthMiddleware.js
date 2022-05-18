const {verify} = require("jsonwebtoken")

const validateToken = (req, res, next) => {
    //accessToken from localStorage
    const accessToken = req.header("accessToken")
    //if theres no accessToken, then cannot log in
    if(!accessToken){
        return res.json({error: "User not logged in!"});
    }
    try{
        //checks if accessToken and string is correct, then user can login
        const validToken = verify(accessToken, "importantsecret")
        req.user = validToken;
        if(validToken){
            return next();
        }
    }
    catch(err){
        res.json({error: err});
    }
};

module.exports = {validateToken};