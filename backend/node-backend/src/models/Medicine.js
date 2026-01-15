import mongoose from 'mongoose'

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  expiryDate: Date,
  stock: { type: Number, default: 0 }
},{ timestamps: true })

export default mongoose.model('Medicine', MedicineSchema)
