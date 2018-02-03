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
	if (this.first.length <= 2) {
    return next(new Error('First Name is too Short.'));
  }
	if (this.last.length <= 2) {
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