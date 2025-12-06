const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://bookinguser:booking123@cluster0.uymsncc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Password ko Hash karte hain (Security ke liye)
    const password = 'admin123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Database mein save/update karte hain
    const result = await mongoose.connection.collection('users').updateOne(
      { email: 'admin@booking.com' },
      { 
        $set: { 
          name: 'Super Admin',
          email: 'admin@booking.com',
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date()
        } 
      },
      { upsert: true } // Agar nahi hai to naya banao
    );

    console.log('-----------------------------------');
    console.log('🎉 Admin User Created Successfully!');
    console.log('📧 Email:    admin@booking.com');
    console.log('🔑 Password: admin123');
    console.log('-----------------------------------');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
