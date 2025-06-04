const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  createur: { type: String, required: true },
  titre: { type: String, required: true },
  imageUrl: { type: String, required: true },
  contenu: { type: String, required: true },
  dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', blogSchema);
