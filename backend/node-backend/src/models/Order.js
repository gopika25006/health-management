import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }, name: String, qty: Number, price: Number }],
  total: Number,
  status: { type: String, enum: ['placed','fulfilled','cancelled'], default: 'placed' },
  prescriptionRequired: { type: Boolean, default: false }
},{ timestamps: true })

export default mongoose.model('Order', OrderSchema)
