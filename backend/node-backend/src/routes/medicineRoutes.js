import express from 'express'
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js'
import Medicine from '../models/Medicine.js'

const router = express.Router()

// Public list
router.get('/', async (req, res)=>{
  const meds = await Medicine.find()
  res.json(meds)
})

// Admin create
router.post('/', requireAuth, requireAdmin, async (req, res)=>{
  const med = await Medicine.create(req.body)
  res.json(med)
})

// Admin update
router.patch('/:id', requireAuth, requireAdmin, async (req, res)=>{
  const m = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(m)
})

// Admin delete
router.delete('/:id', requireAuth, requireAdmin, async (req, res)=>{
  await Medicine.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
