import mongoose from 'mongoose'

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  difficulty: { type: String, default: 'Easy' },
  location: { type: String, default: 'Bir Billing, Himachal Pradesh' },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  features: [{ type: String }],
  included: [{ type: String }],
  excluded: [{ type: String }],
  // NEW FIELDS
  prerequisites: [{ type: String }], // Array of strings
  soloFlightExperience: [{ type: String }], // Array of strings
  trainingProgram: [{ type: String }], // Array of strings
  safetyAndSupport: [{ type: String }], // Array of strings
  whatToBring: [{ type: String }], // Array of strings
  // END NEW FIELDS
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

const Package = mongoose.models?.Package || mongoose.model('Package', PackageSchema)

export default Package
