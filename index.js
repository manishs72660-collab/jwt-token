require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const main=require("./database");
const User=require("./models/user");
const validUser=require("./utils/validator");
const  bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
const userAuth=require("./middleware/userauth");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/info",userAuth, async(req, res) => {
    try{

    // const payload =  jwt.verify(req.cookies.token,"manish@13412$");
    // console.log(payload);
    const ans=await User.find({});
    res.send(ans);
    }catch(err){
        res.send("Error "+err.message);
    }
});
app.get("/user",userAuth,async(req,res)=>{
    // res.send("user data");

    try{
    //    const payload =  jwt.verify(req.cookies.token,"manish@13412$");
    //    console.log(payload);    
    //    const{_id}=payload;
    //    const result=await User.findById(_id);
       res.send(req.result);
    }catch(err){
        res.send("Error "+err.message);
    }
})

app.post("/register",userAuth,async(req,res)=>{
    try{
    validUser(req.body);
    // req.body.password = await bcrypt.hash(req.body.password,10);
    await User.create(req.body);
    res.send("register sucessfully");
    }catch(err){
        res.send("Error "+err.message);
    }
})

app.post("/login",async(req,res)=>{
    try{
    const people = await User.findOne({emailId:req.body.emailId});

    const IsAllowed = await bcrypt.compare(req.body.password, people.password);

        if(!IsAllowed)
            throw new Error("Invalid credentials");
        
        
        const token = jwt.sign({_id:people._id, emailId:people.emailId},"manish@13412$");

        res.cookie("token",token);
        res.send("login sucessfully");
   }catch(err){
     res.send("Error "+err.message);
   }
})

app.patch("/user",async(req,res)=>{

    try{
        const payload =  jwt.verify(req.cookies.token,"manish@13412$");
        const {_id, ...update} = req.body;
        await User.findByIdAndUpdate(_id,update,{"runValidators":true});
        res.send("Update Succesfully");
    }
    catch(err){
        res.send("Error "+err.message);
    }
})


app.delete("/delete",async(req,res)=>{
   try{
       const payload =  jwt.verify(req.cookies.token,"manish@13412$");
        //  authenticate the user: Token
        const{_id}=payload;
        await User.findByIdAndDelete(_id);
        res.send("Deleted Succesfully");
    }
    catch(err){
        res.send("Error"+err.message);
    }

})


main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(3000, ()=>{
        console.log("Listening at port 3000");
    })
})
.catch((err)=>console.log(err));