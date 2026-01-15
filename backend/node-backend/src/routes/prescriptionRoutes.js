import express from 'express'
import { upload } from '../middleware/uploadMiddleware.js'
import Prescription from '../models/Prescription.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Upload a prescription (user)
router.post('/', requireAuth, upload.single('file'), async (req, res)=>{
  const { medicineId } = req.body
  const userId = req.user.id
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : undefined
  const pres = await Prescription.create({ user: userId, medicine: medicineId, fileUrl })
  res.json(pres)
})

// User can view their prescriptions
router.get('/me', requireAuth, async (req, res)=>{
  const list = await Prescription.find({ user: req.user.id }).populate('medicine')
  res.json(list)
})

// Delete a prescription (user) - also remove uploaded file if present
import fs from 'fs'
import path from 'path'

router.delete('/:id', requireAuth, async (req, res)=>{
  const { id } = req.params
  const pres = await Prescription.findById(id)
  if(!pres) return res.status(404).json({message:'Not found'})
  if(pres.user.toString() !== req.user.id) return res.status(403).json({message:'Not allowed'})
  // remove file if exists
  if(pres.fileUrl){
    const filePath = path.join(process.cwd(), pres.fileUrl.replace(/^\//, ''))
    try{ if(fs.existsSync(filePath)) fs.unlinkSync(filePath) }catch(e){ console.warn('Failed removing file', e) }
  }
  await pres.remove()
  res.json({message:'Deleted'})
})

export default router
