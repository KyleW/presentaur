var mongo = require('mongodb');
var BSON =  mongo.BSONPure;
var dbHelpers = require('./dbHelpers.js');

module.exports = {

  findOne:function(user , callback){
    dbHelpers.db.collection('users',function(err,collection){
      collection.find(user).toArray(function(err,result){
        if(err) {console.log("Looking for a user and failed ",err);}
        else {
          callback(err, result[0]);
        }
      });
    });
  },

  findById:function(id, callback){
    dbHelpers.db.collection('users',function(err,collection){
      collection.find({_id:new BSON.ObjectID(id)}).toArray(function(err,user){
        if(err) {console.log("Looking for a user and failed ",err);}
        else {
          callback(err, user[0]);
        }
      });
    });
  },

  create: function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var doc = {'username': username, 'password': password};
    dbHelpers.db.collection('users', function (err, collection){
      collection.save(doc, {w:1}, function (err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  findOrCreate: function(user,callback){
    dbHelpers.db.collection('users',function(err,collection){
      collection.find(user.email).toArray(function(err,result){
        if(err) {console.log("Looking for a user and failed failed ",err);}
        else {
          if(result.length > 0){
            callback(err, result[0]);
          } else {
            collection.save(user, {w:1}, function (err, result) {
              if(err){
               console.log("Insert failed: ", err);
              } else {
                console.log('Could not find user. Added a new one user' + result);
                callback(err, result);
              }
            });
          }
        }
      });
    });
  }
};

