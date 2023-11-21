import * as express from "express";
import { Request,Response } from "express";
import Song from "../../model/song"
// import { Error } from "mongoose";
// import { Express } from "express-serve-static-core";
const app = express();

export class SongRoute{
    // songsRouteGetPost(app: express.Express){
    songsRouteGetPost(){
        // console.log("inside songsRouteGetPost method");
        // app.route('/getSong').get((req:Request,res:Response)=>{
        //     console.log("inside get method");
        //     Song.find((err:Error,data:any)=>{
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log(data);
        //             res.json(data);
        //         }
        //     })
        // })
        app.get('/getSong',(req:Request,res:Response)=>{
            Song.find((err:Error,data:any)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    res.json(data);
            }});
        });


    app.route('/setSong').post((req:Request,res:Response)=>{
        console.log("inside post method");
        Song.create(req.body,(err:Error,data:any)=>{
            if(err){
                console.log(err);
   ``         }else{
                res.json(data);
                console.log("inside post result",data);
            }
        })
    })
    }
}



////////////////////////////////////////////////////////////////////////////////////////////////
// const express = require("express"); 
// const bodyParser = require("body-parser");
//  const cors = require("cors");
// const mongoUtils = require("../../server") 
// const directorModel  = require('../../model/song');
// const app=express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));
// mongoUtils.mongooseConnect();
// mongoUtils.Connect();

// app.get("/directors",(req:Request,res:Response)=>{
//     directorModel.find((e:Error,r:any)=>{
//         if(e) { console.log(e); }
//         return res.send(r);
//     })
// })

// app.post("/directors",(req,res)=>{
//     if(req.body){
//         const s=new directorModel(req.body);
//         s.save().then(r => {return res.send(r);}).catch(e =>console.log(e));
//     }
// })

// app.listen(8001,()=>{
//     console.log("connected  8001")
// })