"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(tweetData, callback) {
      db.collection('tweets').insertOne(tweetData);
      callback(null, true);
    },

    
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },

    // db.collection('tweets').findOne({ _id: ObjectId(id) }, function(err, result) {
    //   console.log('result.likes', result);
    //   callback(result.likes);
    // }),

    updateLikes: function(data, callback) {
      const id = data.id;
      const status = data.likeStatus;
      if (status === 'add') {
        db.collection('tweets').findOneAndUpdate(
          { _id: ObjectId(id) }, 
          { $inc : { 'likes': 1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      } else if (status === 'remove') {
        db.collection('tweets').findOneAndUpdate(
          { _id: ObjectId(id) }, 
          { $inc : { 'likes': -1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      }
    }

  };
}
