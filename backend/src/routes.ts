import { Router } from 'express'
import OrphanagesController from './controllers/OrphanagesController'
import UsersController from './controllers/UsersController'
import multer from 'multer'
import multerConfig from './config/upload'
import authMiddleware from './middlewares/auth'

const routes = Router()
const upload = multer(multerConfig)

routes.post('/user', UsersController.create)
routes.post('/user/auth', UsersController.login)
routes.post('/user/verify', authMiddleware, UsersController.verifyToken)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)

export default routes