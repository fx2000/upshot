const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  issue: {
    type: ObjectId,
    ref: 'Issue'
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

commentSchema.index({
  content: 'text'
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;