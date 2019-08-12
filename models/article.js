const { Schema, model } = require('mongoose');

const articleSchema = new Schema({ 
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = model('Article', articleSchema);