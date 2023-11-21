import {Schema} from 'mongoose';
const mongoose=require("mongoose");
// const director=mongoose.Schema({
//     name:{
//         type:String,
//         requried:true,
//     },
//     age:{
//         type:Number,
//         required:true,
//     },
//     gender:{
//         type:String,
//         required:true,
//     },
//     awards:{
//         type:Number,
//         required:true,
//     },
// })

// const directorModel=mongoose.model("director",director);
// module.exports={directorModel};


let songSchema:Schema = new Schema({
    name:{
        type:String
    },
    artist:{
        type:String
    }
},{
    collection: 'songs'
}
)

export default mongoose.model('Song',songSchema);

//"body-parser": "^1.20.2",
// "cors": "^2.8.5",
// "express": "^4.15.2",
// "mongodb": "^6.3.0",
// "mongoose": "^8.0.0",