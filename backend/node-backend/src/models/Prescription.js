import mongoose from 'mongoose'

const PrescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  fileUrl: String,
  status: { type: String, enum: ['pending','accepted','rejected'], default: 'pending' },
  note: String
},{ timestamps: true })

export default mongoose.model('Prescription', PrescriptionSchema)
