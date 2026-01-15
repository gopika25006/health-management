import express from 'express'
import HealthCamp from '../models/HealthCamp.js'
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js'
import CampBooking from '../models/CampBooking.js'
import User from '../models/User.js'

const router = express.Router()

// Public get all
router.get('/', async (req, res)=>{
  const camps = await HealthCamp.find()
  res.json(camps)
})

// Admin create
router.post('/', requireAuth, requireAdmin, async (req, res)=>{
  const c = await HealthCamp.create(req.body)
  res.json(c)
})

// Book a slot (user)
router.post('/book', requireAuth, async (req, res)=>{
  const { name, age, address, contact, campId, campName, campDate, campTime, campLocation } = req.body
  const booking = await CampBooking.create({ user: req.user.id, userName: name, age, address, contact, campName, campDate, campTime, campLocation })
  res.json(booking)
})

// User: list my bookings
router.get('/bookings/me', requireAuth, async (req, res)=>{
  const list = await CampBooking.find({ user: req.user.id })
  res.json(list)
})

// Admin: view all bookings
router.get('/bookings', requireAuth, requireAdmin, async (req, res)=>{
  try{
    // populate user (only name and phone) and return a normalized shape so frontend doesn't need to guess fields
    const list = await CampBooking.find().populate({ path: 'user', select: 'name phone' }).sort({ createdAt: -1 })
    const out = list.map(b => ({
      _id: b._id,
      user: b.user ? { id: b.user._id, name: b.user.name, phone: b.user.phone } : null,
      userName: b.userName,
      age: b.age,
      address: b.address,
      contact: b.contact || (b.user && b.user.phone) || null,
      campName: b.campName,
      campDate: b.campDate,
      campTime: b.campTime,
      campLocation: b.campLocation,
      status: b.status,
      createdAt: b.createdAt
    }))
    res.json(out)
  }catch(err){
    console.error('Failed to load bookings', err)
    res.status(500).json({ message: 'Failed to load bookings' })
  }
})

export default router
