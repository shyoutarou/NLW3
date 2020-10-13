import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from './database/models/Orphanage'
const routes = Router()

routes.post('/orphanages', async (req: Request, res: Response) => {
    const { latitude, longitude, name, opening_hours,
        instructions, about, open_on_weekends } = req.body

    const orphanagesRepository = getRepository(Orphanage)

    const orphanage = orphanagesRepository.create({ latitude, longitude, name, opening_hours,
        instructions, about, open_on_weekends })
    
    await orphanagesRepository.save(orphanage)

    return res.status(201).json(orphanage)
})

export default routes