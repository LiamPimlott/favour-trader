var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

let NameSchema = new mongoose.Schema({
  first: {
    type: String,
    minlength: 2,
  },
  last: {
    type: String,
    minlength: 2,
  }
})

var AddressSchema = new mongoose.Schema({
  number: {
    type: Number,
  },
  street: {
    type: String,
  },
  postalCode: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  }
});

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: [true, 'Email should be lowercase'],
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
    type: NameSchema,
    required: [true, 'Name is required.'],
  },
  address: {
    type: AddressSchema,
    required: [true, 'Address is required.']
  },
  about: {
    type: String
  },
  has: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill"
    }]
  },
  wants: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill"
    }]
  }
});

// Save the user's hashed password
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Compare password login input to what is stored in db
UserSchema.methods.comparePassword = function (passToCompare, callback) {
  bcrypt.compare(passToCompare, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);