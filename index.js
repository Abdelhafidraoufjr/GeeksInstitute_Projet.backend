const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const initializeAdminUser = require('./initUsers');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:9095' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await initializeAdminUser();  // <-- Initialise l'utilisateur admin ici
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const blogsRoutes = require('./routes/blogs');
app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
