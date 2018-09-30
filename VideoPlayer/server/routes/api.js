const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');

//Mongo DB Atlas Database
const db1 = "mongodb+srv://kunalj1:kunalj12@learning-cluster-lxdg7.mongodb.net/learn_database?retryWrites=true";

//mLab Database
const db2 = "mongodb://userkunal:kunalj12@ds117625.mlab.com:17625/videoplayer";

mongoose.Promise = global.Promise;

mongoose.connect(db1,function(err){
  if(err){
    console.error("Error!!!"+err);
  }
});

router.get('/videos',function(req,res){
  console.log('Get request for all video');
  Video.find({})
  .exec(function(err,videos){
    if(err){
      console.log("Error retrieving video");
    }else{
      res.json(videos);
    }
  });
});


router.get('/videos/:id',function(req,res){
  console.log('Get request for a single video');
  Video.findById(req.params.id)
  .exec(function(err,video){
    if(err){
      console.log("Error retrieving video");
    }else{
      res.json(video);
    }
  });
});

router.post('/video',function(req,res){
  console.log("Post a new video");
  var newVideo=new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save(function(err,insertedVideo){
    if(err){
      console.error("Error saving video");
    }else{
      res.json(insertedVideo);
    }
  });
});

router.put('/video/:id',function(req,res){
  console.log("Update a video");
  Video.fin
  Video.findByIdAndUpdate(req.params.id,
    {
      $set:{title:req.body.title, url:req.body.url, description:req.body.description},
    },
    {
      new:true
    },
    function(err,updatedVideo){
      if(err){
        console.error("Error updating thee video");
      }else{
        res.json(updatedVideo);
      }
    }
  )
});

router.delete('/video/:id',function(req,res){
  console.log("Deleting a video");
  Video.findByIdAndDelete(req.params.id,function(err,deletedVideo){
    if(err){
      res.send("Error Deleting Video");
    }else{
      res.json(deletedVideo);
    }
  })
})

module.exports = router;

