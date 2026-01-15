import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/authRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import medicineRoutes from './routes/medicineRoutes.js'
import campRoutes from './routes/campRoutes.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Serve uploaded prescription files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.use('/api', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/medicine', medicineRoutes)
app.use('/api/healthcamps', campRoutes)
app.use('/api/prescriptions', prescriptionRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 8080
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/village_health'

mongoose.connect(MONGO)
  .then(()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=> console.log(`Server started on ${PORT}`))
  })
  .catch(err => { console.error('MongoDB connection error:', err) })
