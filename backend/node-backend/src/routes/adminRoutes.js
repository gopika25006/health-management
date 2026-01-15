import express from 'express'
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js'
import Prescription from '../models/Prescription.js'
import User from '../models/User.js'
import Order from '../models/Order.js'

const router = express.Router()

// List pending prescriptions
router.get('/prescriptions', requireAuth, requireAdmin, async (req, res)=>{
  const list = await Prescription.find({ status: 'pending' }).populate('user medicine')
  res.json(list)
})

// Approve / reject
router.patch('/prescriptions/:id', requireAuth, requireAdmin, async (req, res)=>{
  const { id } = req.params
  const { action, note } = req.body // action: 'accept' | 'reject'
  const pres = await Prescription.findById(id)
  if(!pres) return res.status(404).json({message:'Not found'})
  pres.status = action === 'accept' ? 'accepted' : 'rejected'
  if(note) pres.note = note
  await pres.save()
  res.json(pres)
})

// List accepted orders
router.get('/orders', requireAuth, requireAdmin, async (req, res)=>{
  const list = await Order.find().populate('user').populate('items.medicine')
  res.json(list)
})

export default router
