import mongoose from 'mongoose';

const PilotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  exp: { type: String, required: true },
  flights: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Pilot = mongoose.models.Pilot || mongoose.model('Pilot', PilotSchema);

export default Pilot;
