const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/blogs', async (req, res) => {
  try {
    const { createur, titre, imageUrl, contenu } = req.body;

    if (!createur || !titre || !imageUrl || !contenu) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const nouveauBlog = new Blog({ createur, titre, imageUrl, contenu });
    await nouveauBlog.save();

    res.status(201).json({ message: 'Blog ajouté avec succès !', blog: nouveauBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
