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

  create :function(){}
};

