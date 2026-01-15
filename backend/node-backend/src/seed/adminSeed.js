import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import Admin from '../models/Admin.js'

dotenv.config()
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/village_health'

async function run(){
  await mongoose.connect(MONGO)
  const username = process.env.SEED_ADMIN_USER || 'admin'
  const pwd = process.env.SEED_ADMIN_PWD || 'admin123'
  const existing = await Admin.findOne({ username })
  if(existing){ console.log('Admin exists, skipping'); process.exit(0) }
  const hash = await bcrypt.hash(pwd, 10)
  const admin = await Admin.create({ username, password: hash })
  console.log('Created admin:', admin.username)
  process.exit(0)
}

run().catch(err=>{ console.error(err); process.exit(1) })
