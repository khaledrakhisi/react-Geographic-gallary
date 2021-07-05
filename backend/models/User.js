const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name: {type: String, required : true},
    email: {type: String, required : true, unique : true},
    password: {type: String, required : true, minlength: 6},
    imageUrl: String,
    places: {type: String, required : true},
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userSchema);