import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";
import * as ENV from "./config.js";

const app = express()
app.use(express.json())
app.use(cors())

const constr=`mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(constr)
//Express route to handle the like and dislike

app.put("/likePost",async(req,res)=>{
   try{
      const {userId,postId} = req.body
      const postToUpdate = await PostModel.findOne({_id:postId})
      const userIndex = postToUpdate.likes.users.indexOf(userId)
      if(userIndex === -1){
         //User is not found
         //increase the count and add the user id
         const updatedPost = await PostModel.findOneAndUpdate(
             {_id:postId},
             {
                $inc:{"likes.count":1},
                $addToSet:{"likes.users":userId}
               },
             {
               new:true
             }
            )
            res.send({post:updatedPost,msg:"Post is liked"})
      }
      else{
          //User is  found
         //Decrese the count and remove the user id
         const updatedPost = await PostModel.findOneAndUpdate(
            {_id:postId},
            {
               $inc:{"likes.count":-1},
               $pull:{"likes.users":userId}
              },
            {
              new:true
            }
           )
           res.send({post:updatedPost,msg:"Post is unliked"})
      }
      console.log(postToUpdate)
      res.send(postToUpdate)
   }
   catch(error){
      console.log(error)
   }

})




app.post("/logout",async(req,res)=>{
   res.status(200).send({msg:"Logout successful"})
})
app.get("/getPosts",async(req,res)=>{
   try{
      const posts = await PostModel.find().sort({createdAt: 1})
      const countPost = await PostModel.countDocuments();
      res.send({posts:posts,count:countPost})
   }
   catch(error){
      res.status(400).json({error:"Unexpected error occurred"})
   }
})
app.post("/savePost",async(req,res)=>{
   try{
      const {postMsg,email} = req.body
      const post = PostModel({postMsg,email})
      await post.save()
      res.send({post:post,msg:"Post is saved"})
   }
   catch(error){
      res.status(400).json({error:"Unexpected error occurred"})
   }
})
app.post("/registerUser",async(req,res)=>{
    try{
        const{name,email,password} =req.body
        const user =  UserModel({name,email,password})
        await user.save()
        res.send({user:user, msg:"User data is added"})
    }
    catch(error){
        res.status(400).json({error:"Unexpected error occurred"})
    }

})
app.post("/login",async(req,res)=>{
     try{
        const{email,password} =req.body
        const user = await UserModel.findOne({email: email})
        if(!user){
           res.status(500).json({msg:"Could not find the User"})
        }
        else if(user.password !== password){
           res.status(500).json({msg:"Password is incorrect"})
        }
        else{
          res.status(200).json({user: user, msg:"Login Successful"})
        }  
     }
     catch(error){
        res.status(500).json({msg:"Unexpected error occurred"})
     }

})

app.listen(3001,()=>{console.log("server is connected")})