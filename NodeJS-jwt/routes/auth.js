const router = require("express").Router();
const User = require("../model/User");
const {registerValication, loginValidation} = require("../validation/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/verifytoken")

router.post("/register", async (req, res) => {
    try{
        registerValication(req.body);
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
    
        try{
            const savedUser = await user.save();
            res.send(savedUser);
        }catch(error){
            res.status(400).send(error);
        }

        // res.send(value);
    }catch(error){
        return res.status(400).send(error.details[0].message);
    }
});

router.post("/login", async (req, res) => {
    try{
        loginValidation(req.body);
        // console.log(req.body);
        const user = await User.findOne({email: req.body.email});
        // console.log(user);
        if(!user){
            return res.status(400).send("email or password is invalid - E");
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
            return res.status(400).send("email or password is invalid - P");
        }
        // create and assign token
        const token = jwt.sign({email : user.email}, process.env.TOKEN_SECRET);
        res.header("auth-token", token).send(token);
        // console.log(token);
        // res.send("Logged in");

    }catch(error){
        res.status(400).send(error);
    }
});

router.get("/posts", auth, (req, res) => {
    res.json({posts: {
        title: "first post", 
        description: "private post"
    },email: req.user.email});
});

module.exports = router;