var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
var db = mongoose.connection;

db.on('error', function() {
    console.log('Connect db failed');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
});
var myblogSchema = new Schema ({
    username: String,
    title: String,
    content: String
});
userSchema.statics.findByName = function(name, cb) {
    return this.find({username: name}, cb);
};
myblogSchema.statics.findByName = function(name, cb) {
    return this.find({username: name}, cb);
};
var userModel = mongoose.model('userModel', userSchema);
var myblogModel = mongoose.model('myblogModel', myblogSchema);

module.exports.userModel = userModel;
module.exports.myblogModel = myblogModel;
