import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js'
import Admin from '../models/Admin.js'
dotenv.config()

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

// User registration
router.post('/register', async (req, res)=>{
  const { name, email, password, age, gender, address, phone } = req.body
  if(!name || !email || !password) return res.status(400).json({message:'Missing fields'})
  const existing = await User.findOne({ email })
  if(existing) return res.status(400).json({message:'Email exists'})
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hash, age, gender, address, phone })
  return res.json({ id: user._id, email: user.email })
})

// User login
router.post('/login', async (req, res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user) return res.status(401).json({message:'Invalid credentials'})
  const ok = await bcrypt.compare(password, user.password)
  if(!ok) return res.status(401).json({message:'Invalid credentials'})
  const token = jwt.sign({ id: user._id, role: 'user' }, JWT_SECRET, { expiresIn: '7d' })
  return res.json({ token })
})

// Admin login
router.post('/admin/login', async (req, res)=>{
  const { username, password } = req.body
  const admin = await Admin.findOne({ username })
  if(!admin) return res.status(401).json({message:'Invalid admin credentials'})
  const ok = await bcrypt.compare(password, admin.password)
  if(!ok) return res.status(401).json({message:'Invalid admin credentials'})
  const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
  return res.json({ token })
})

export default router
