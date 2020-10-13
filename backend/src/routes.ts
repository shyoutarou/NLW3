import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import multer from 'multer'
import multerConfig from './config/upload'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)

export default routes