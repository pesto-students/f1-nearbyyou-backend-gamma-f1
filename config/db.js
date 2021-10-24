const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });

        console.log("mongodb connected")
    }catch(err){
        console.log("mongo db connection failed with ",err.message)
        process.exit(1);
    }

}


module.exports=connectDB
