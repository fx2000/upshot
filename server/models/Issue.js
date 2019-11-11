const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const issueSchema = new Schema({

}, {
  timestamps: true
});

issueSchema.index({

});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
