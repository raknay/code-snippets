const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.header("auth-token");
    if(!token){
        return res.send("access denied");
    }

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    }catch(error){
        res.status(400).send("invalid token");
    }
}