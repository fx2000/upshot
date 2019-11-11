const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    default: ''
  },
  issues: [{
    type: ObjectId,
    ref: 'Issue'
  }]
}, {
  timestamps: true
});

projectSchema.index({
  name: 'text',
  description: 'text'
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;