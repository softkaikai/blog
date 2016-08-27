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
userSchema.statics.findByName = function(name, cb) {
    return this.find({username: name}, cb);
};
var userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
