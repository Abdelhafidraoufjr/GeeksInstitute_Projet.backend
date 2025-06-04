const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// READ - Obtenir tous les blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ dateCreation: -1 });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des blogs' });
  }
});

// CREATE - Ajouter un blog
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

// UPDATE - Modifier un blog existant
router.put('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { createur, titre, imageUrl, contenu } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog non trouvé' });
    }

    blog.createur = createur || blog.createur;
    blog.titre = titre || blog.titre;
    blog.imageUrl = imageUrl || blog.imageUrl;
    blog.contenu = contenu || blog.contenu;

    await blog.save();

    res.json({ message: 'Blog mis à jour avec succès', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du blog' });
  }
});

// DELETE - Supprimer un blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog non trouvé' });
    }

    await blog.deleteOne();

    res.json({ message: 'Blog supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du blog' });
  }
});

module.exports = router;
