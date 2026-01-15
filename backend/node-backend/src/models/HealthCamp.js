import mongoose from 'mongoose'

const HealthCampSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  date: Date,
  description: String,
  slots: { type: Number, default: 0 }
},{ timestamps: true })

export default mongoose.model('HealthCamp', HealthCampSchema)
