import mongoose from 'mongoose'

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard'],
  },
  location: {
    type: String,
    default: 'Bir Billing, Himachal Pradesh',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  advanceAmount: {
    type: Number,
    default: 5000,
  },
  courseOverview: {
    type: String,
    default: '',
  },
  whatYouWillMaster: {
    type: [
      {
        title: String,
        description: String,
        icon: String,
      }
    ],
    default: [],
  },
  included: {
    type: [String],
    default: [],
  },
  prerequisites: {
    type: [String],
    default: [],
  },
  trainingProgram: {
    type: [String],
    default: [],
  },
  soloFlightExperience: {
    type: [String],
    default: [],
  },
  safetyAndSupport: {
    type: [String],
    default: [],
  },
  whatToBring: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
})

export default mongoose.models.Package || mongoose.model('Package', PackageSchema)
