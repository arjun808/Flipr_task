const express = require('express')
const app = express();
 const cookieParser = require("cookie-parser")
app.use(express.json());
const cors= require("cors")
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
const dotenv=require("dotenv")
dotenv.config()
const database=require("./config/db");
database();
const userRoutes= require("./routes/user")


app.use("/api/v1/auth",userRoutes)
app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is started on port number ${process.env.PORT}`)
})