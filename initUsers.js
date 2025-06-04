const User = require('./models/User'); // adapte selon ton chemin

async function initializeAdminUser() {
  try {
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin0000';

    // Cherche si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      // Crée un nouvel utilisateur admin
      const adminUser = new User({
        email: adminEmail,
        password: adminPassword,
      });
      await adminUser.save();
      console.log('✅ Utilisateur admin créé avec succès');
    } else {
      console.log('ℹ️ Utilisateur admin déjà existant');
    }
  } catch (err) {
    console.error('❌ Erreur lors de la création de l\'utilisateur admin:', err);
  }
}

module.exports = initializeAdminUser;
