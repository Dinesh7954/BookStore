import express from 'express';
import {PORT ,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./models/bookmodels.js"
import bookRoutes from  "./routes/bookRoutes.js"
import cors from "cors";

const app =express();
app.use(cors());                                   // USE THIS Middleware before  any routes 
app.use(express.json());                             //Middelware for parsing request body 
app.use("/books", bookRoutes);                        //Middelware for books route

//Middlware  for handling CORS POLICY
//Option 1: Allow  All Origins with Default of Cors(*)
//app.use(cors());
//Option 2: Allow custom Origins 
// app.use(cors({
//     origin:"http://localhost:3000/",
//     methods:["GET", "POST" ,"DELETE","PUT"],
//     allowedHeaders:["Content-Type"]
// }))


app.get("/", (req, res) =>{
     console.log(req);
     return res.status(234).send("welcome to MERN stack development ")
})




mongoose.connect(mongoDBURL)
.then(() => {
    console.log("app connected to database");
    app.listen(PORT,() => {
        console.log(`app is listening to port ${PORT}`)
    });
})
.catch((error) =>{
    console.log(error);
})