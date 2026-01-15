import mongoose from 'mongoose'

const CampBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  age: Number,
  address: String,
  contact: String,
  campName: String,
  campDate: String,
  campTime: String,
  campLocation: String,
  status: { type: String, enum: ['booked','cancelled'], default: 'booked' }
},{ timestamps: true })

export default mongoose.model('CampBooking', CampBookingSchema)
