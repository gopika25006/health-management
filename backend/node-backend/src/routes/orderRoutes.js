import express from 'express'
import Order from '../models/Order.js'
import Prescription from '../models/Prescription.js'
import Medicine from '../models/Medicine.js'
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Place an order (user)
router.post('/', requireAuth, async (req, res)=>{
  const { items, total } = req.body
  const userId = req.user.id

  // Check prescriptions for items that require them
  for(const it of items){
    const med = await Medicine.findById(it.medicine)
    if(med && med.prescription){
      const pres = await Prescription.findOne({ user: userId, medicine: med._id, status: 'accepted' })
      if(!pres) return res.status(400).json({ message: `Prescription required for ${med.name}` })
    }
  }

  const order = await Order.create({ user: userId, items, total })
  res.json(order)
})

// User: list my orders
router.get('/me', requireAuth, async (req, res)=>{
  const list = await Order.find({ user: req.user.id }).populate('items.medicine')
  res.json(list)
})

// Admin: list all orders
router.get('/', requireAuth, requireAdmin, async (req, res)=>{
  const list = await Order.find().populate('user').populate('items.medicine')
  res.json(list)
})

export default router
