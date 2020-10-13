import multer from 'multer'
import path from 'path'

export default {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`
            cb(null, fileName)
        }
    })
}