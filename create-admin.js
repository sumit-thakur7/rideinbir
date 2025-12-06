const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = 'mongodb+srv://bookinguser:booking123@cluster0.uymsncc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri).then(async () => {
  console.log('Connected to MongoDB');
  
  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date
  });
  
  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await User.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date()
  });
  
  console.log('✅ Admin user created!');
  console.log('Email: admin@admin.com');
  console.log('Password: admin123');
  
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
