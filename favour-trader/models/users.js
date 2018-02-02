var mongoose = require("mongoose");

var nameSchema = new mongoose.Schema({
  first: {
  	type:String
  },
  last: {
  	type: String
  }
});

nameSchema.pre('save', function (next) {
	if (2 > this.first.length) {
    return next(new Error('First Name is too Short.'));
  }
	if (2 > this.last.length) {
    return next(new Error('Last Name is too Short.'));
  }
  next();
});

var addressSchema = new mongoose.Schema({
  number: Number,
  street: String,
  postalCode: String,
  city: String,
  state: String,
  country: String,
});

var objectId = mongoose.Schema.Types.ObjectId;
var skillSchema = new mongoose.Schema({ skill: objectId });

var user = new mongoose.Schema({
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
    type: skillSchema
  },
  wants: {
    type: skillSchema
  }
});

module.exports = mongoose.model("User", user);