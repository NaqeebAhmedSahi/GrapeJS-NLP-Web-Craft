// models/Page.js
const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  name: String,
  slug: String,
  content: {
    'mycustom-html': String,
    'mycustom-css': String
  }
});

module.exports = mongoose.model('Page', PageSchema);
