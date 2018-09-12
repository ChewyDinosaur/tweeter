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

    updateLikes: function(data, callback) {
      const id = data.id;
      const status = data.likeStatus;
      if (status === 'add') {
        console.log('adding like count to tweet: ' + id);
        db.collection('tweets').update(
          { _id: ObjectId(id) },
          { $set:
            {
              'likes': 1
            }
          }, callback('successful add!'),
        );
      } else if (status === 'remove') {
        console.log('removing like count from tweet: ' + id);
        db.collection('tweets').update(
          { _id: ObjectId(id) },
          { $set:
            {
              'likes': 0
            }
          }
        );
      }
      // callback('callback trigger');
    }

  };
}
