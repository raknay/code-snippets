const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
// import routs
const authRoute = require("./routes/auth");

env.config({path: "./.env"});

// connect to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connected to db");
});

// Middleware
app.use(express.json());
//route middleware
app.use("/api/user", authRoute);

app.listen(3000, () => {
    console.log("Server running in the port 3000");
});