'use strict';

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require('./util/simulate-delay');
const ObjectId = require('mongodb').ObjectID;
const moment = require('moment');
moment().format();

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
        // Apply momentjs to all tweets created_at value to display 'X time ago'
        tweets.forEach(function(tweet) {
          tweet.created_at = moment().to(tweet.created_at);
        })
        callback(null, tweets);
      });
    },

    updateLikes: function(data, callback) {
      const id = data.id;
      const status = data.likeStatus;
      const collection = db.collection('tweets');
      if (status === 'add') {
        collection.findOneAndUpdate(
          { _id: ObjectId(id) }, 
          { $inc : { 'likes': 1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      } else if (status === 'remove') {
        collection.findOneAndUpdate(
          { _id: ObjectId(id) }, 
          { $inc : { 'likes': -1} },
          { returnOriginal: false },
          function(err, result){ callback(result.value.likes)}
        );
      }
    }

  };
}
