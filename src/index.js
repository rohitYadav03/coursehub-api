const express = require("express");
const {connectDB} = require("./config/db.js");
const cookieParser  = require("cookie-parser");
const {authRouter} = require("./routes/auth.js")
const app = express ();

app.use(express.json())
app.use(cookieParser())

app.use("/auth",authRouter )


connectDB().then(() => {
    console.log("connected to db");
    app.listen(3000, () => {
        console.log("PORT 3000");
    })
}).catch(() => {
    console.log('EROOR in connecting to DB');
    
})