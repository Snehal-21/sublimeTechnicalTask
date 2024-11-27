import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import router from "./routes/authRoutes.js";
// import {taskRoutes} from "./routes/taskRoutes.js";
// import {authRoutes} from "./routes/authRoutes.js"

const app= express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

mongoose.connect(process.env.MONGO)
.then(()=>console.log("db connected"))
.catch((err)=>console.log("error",err));

app.listen(process.env.PORT,()=>console.log(`working on port ${process.env.PORT}`));
