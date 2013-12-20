Db = require('mongodb').Db;
Server = require('mongodb').Server;
var db = new Db('presDB', new Server('locahost', 27017));
