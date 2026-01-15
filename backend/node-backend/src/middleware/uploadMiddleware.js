import multer from 'multer'
import path from 'path'
import fs from 'fs'

const UPLOAD_DIR = path.join(process.cwd(), 'uploads')
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, UPLOAD_DIR) },
  filename: function(req, file, cb){
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`)
  }
})

// Accept only pdf/jpg/jpeg/png and limit to 5MB
function fileFilter(req, file, cb){
  const allowed = ['.pdf', '.jpg', '.jpeg', '.png']
  const ext = path.extname(file.originalname).toLowerCase()
  if(!allowed.includes(ext)){
    return cb(new Error('Only PDF/JPG/PNG files are allowed'))
  }
  cb(null, true)
}

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
