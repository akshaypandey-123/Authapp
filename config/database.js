const mongoose=require ("mongoose")
require("dotenv").config()
const connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,


    })
    .then(console.log("connection establish"))
    .catch((err)=>{
        console.log("connection issue")
        console.error(err)
        process.exit(1)
    })

    
}
module.exports=connect;