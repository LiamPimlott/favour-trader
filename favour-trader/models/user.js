var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
   	unique: true,
  	required: [true, 'Email Address is required.']
  },
  password: {
   	type: String,
   	required: [true, 'Password is required.']
   },
  role: {
    type: String,
    enum: ['Client', 'Admin'],
    default: 'Client'
  },
  name: {
  	type:String,
    minlength: 3,
    required: true
  },
  postalCode: { 
    type:String,
    required: true
  },
  city: { 
    type:String,
    required: true
  },
  state: { 
    type:String,
    required: true
  },
  country: { 
    type:String,
    required: true
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

// Save the user's hashed password
UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next()
  }
});

// Compare password login input to what is stored in db
UserSchema.methods.comparePassword = function(passToCompare, callback) {
  bcrypt.compare(passToCompare, this.password, function(err, isMatch){
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);