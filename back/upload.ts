import * as multer from 'koa-multer'
import path from 'path'
import short from 'short-uuid'

const storageEngine = multer.diskStorage({
  destination: './assets',
  filename: (req, file, fn) => {
    fn(null, `${short.generate()}-${file.fieldname}${path.extname(file.originalname)}`)
  }
})

const validateFile = (file: any, cb: any) => {
  const allowedFileTypes = /jpeq|jpg|png/
  const extension = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const mimeType = allowedFileTypes.test(file.mimeType)
  if (extension && mimeType) {
    return cb(null, true)
  } else {
    cb('Invalid file type. Only JPEG, JPG, PNG file are allowed.')
  }
}

const upload = multer({
  storage: storageEngine,
  limits: {
    fileSize: 200000,
  },
  fileFilter: (req, file, cb) => {
    validateFile(file, cb)
  }
})

export default upload