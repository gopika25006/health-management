import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret'

export function requireAuth(req, res, next){
  const auth = req.headers.authorization
  if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({message:'Missing token'})
  const token = auth.split(' ')[1]
  try{
    const payload = jwt.verify(token, JWT_SECRET)
    req.user = payload
    next()
  }catch(err){
    return res.status(401).json({message:'Invalid token'})
  }
}

export function requireAdmin(req, res, next){
  // requireAuth must run first to populate req.user
  if(!req.user || req.user.role !== 'admin') return res.status(403).json({message:'Admin only'})
  next()
}
