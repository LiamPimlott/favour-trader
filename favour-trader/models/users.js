var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
  first: {
  	type:String,
    minlength: 3,
  },
  last: {
  	type: String,
    minlength: 3,
  }
});

var addressSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  street: { 
    type: String,
    required: true
  },
  postalCode: { 
    type:String,
    required: true
  },
  city: { 
    type:String
  },
  state: { 
    type:String
  },
  country: { 
    type:String
  }
});


var userSchema = new mongoose.Schema({
  name: {
    type: nameSchema,
    required: [true, 'Name is required.'],
  },
  email: {
   	type: String,
   	unique: true,
  	required: [true, 'Email Address is required.']
  },
  password: {
   	type: String,
   	required: [true, 'Password is required.']
   },
  address: {
    type: addressSchema,
   	required: [true, 'Address is required.']
  },
  about: {
    type: String
  },
  has: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }]
  },
  wants: {
    type:[{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }]
  }
});

module.exports = mongoose.model("User", userSchema);