const express = require("express");
const {schemaCheck} = require("./middleware")
const postMongo = require("./db")
const {ObjectId} = require("mongoose").mongo

const apiRouter = express.Router();

apiRouter.get("",(req,res)=>{
    postMongo.find()
    .then((post)=>{
        res.send(post);
    })
    .catch((err)=>{
        res.send(err);
    })
})

apiRouter.post("",schemaCheck,(req,res)=>{
    const currentTime = new Date().getTime();
    const post = new postMongo(
        {
            ...req.body,
            createdAt : currentTime,
            updatedAt : currentTime
        });
    post.save(req.body);
    res.send("saved post");
})

apiRouter.get("/:id",(req,res)=>{
    let objectId = new ObjectId(req.params.id);
    postMongo.findById(objectId)
    .then((post)=>{
        res.send(post);
    })
})

apiRouter.put("/:id",async (req,res)=>{
    
    try{
        let objectId = new ObjectId(req.params.id);
        let updatedPost = await postMongo.findOneAndUpdate(
            {
                _id:objectId
            },
                req.body,
            {
                new:true
            });
            if(updatedPost){
                res.send(updatedPost);
            }
            else{
                res.send("galt input hai bhai");
            }
    }
    catch(err){
        res.status(500).json({ error: "Unable to update post" });
    }

    
})

apiRouter.delete("/:id",(req,res)=>{
    let objectId = new ObjectId(req.params.id);
    postMongo.deleteOne(objectId)
    .then((post)=>{
        res.send("deleted successfully");
    })
})

module.exports = apiRouter;