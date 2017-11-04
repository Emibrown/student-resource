var mongoose = require("mongoose");
var dbURL = "mongodb://127.0.0.1:27017/studresource";
//var dbURL = "mongodb://uh9weniufp3loaq:HPghmijhIoN7h3amL2Sx@bysaqjaui8bkx2q-mongodb.services.clever-cloud.com:27017/bysaqjaui8bkx2q";

mongoose.connect(dbURL);

mongoose.connection.on('connected', function(){
    console.log('mongoose connected to '+ dbURL);
});
mongoose.connection.on('error', function(err){
    console.log('mongoose connection error'+ err);
});
mongoose.connection.on('disconnected', function(){
    console.log('mongoose disconnected ' );
});