const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri-here';

mongoose.connect(MONGODB_URI).then(async () => {
  console.log('Connected to MongoDB');
  
  // User schema
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Hash new password
  const newPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  // Update admin password
  const result = await User.updateOne(
    { email: 'admin@admin.com' },
    { password: hashedPassword }
  );
  
  console.log('Password updated:', result);
  console.log('New credentials:');
  console.log('Email: admin@admin.com');
  console.log('Password: admin123');
  
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
