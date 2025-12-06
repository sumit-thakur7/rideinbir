const mongoose = require('mongoose');

const uri = 'mongodb+srv://bookinguser:booking123@cluster0.uymsncc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });
