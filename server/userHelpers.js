var mongo = require('mongodb');
var BSON =  mongo.BSONPure;
var dbHelpers = require('./dbHelpers.js');

module.exports = {

  findOne:function(user , callback){
    console.log("retrieving user with criteria: ", user);

    dbHelpers.db.collection('users',function(err,collection){
      collection.find(user).toArray(function(err,result){
        if(err) {console.log("Looking for a user and failed failed ",err);}
        else {
          console.log("Found the user you're looking for", result);
          callback(err, result[0]);
        }
      });
    });
  },

  findById:function(id , callback){
    console.log("retrieving user with criteria: ", id);

    dbHelpers.db.collection('users',function(err,collection){
      collection.find({_id:new BSON.ObjectID(id)}).toArray(function(err,user){
        if(err) {console.log("Looking for a user and failed failed ",err);}
        else {
          console.log("Found the user you're looking for", user);
          callback(err, user[0]);
        }
      });
    });
  },

  create: function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var doc = {'username': username, 'password': password};

    console.log('Adding user with username: ' + doc.username);

    dbHelpers.db.collection('users', function (err, collection){
      collection.save(doc, {w:1}, function (err, result) {
        if(err){
          console.log("Insert failed: ", err);
        } else {
          console.log('The user named: ' + result.username + ' has been assigned the id: ' + result._id);
          res.send(JSON.stringify(result));
        }
      });
    });
  },

  findOrCreate: function(user,callback){
    dbHelpers.db.collection('users',function(err,collection){
      collection.find(user).toArray(function(err,result){
        if(err) {console.log("Looking for a user and failed failed ",err);}
        else {
          if(user.length > 0){
            callback(err, user[0]);
          } else {
            collection.save(user, {w:1}, function (err, result) {
              if(err){
               console.log("Insert failed: ", err);
              } else {
                console.log('added a user' + result);
                callback(err, result);
              }
            });
          }
        }
      });
    });
  }
};

