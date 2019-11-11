const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  image: {
    type: String,
    default: ''
  },
  issues: [{
    type: ObjectId,
    ref: 'Issue'
  }],
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }],
  following: [{
    type: ObjectId,
    ref: 'Issue'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
