import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../database/models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default {
    async create (req: Request, res: Response) {
        const { latitude, longitude, name, opening_hours,
            instructions, about, open_on_weekends } = req.body
    
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        })
    
        const orphanage = orphanagesRepository.create({ latitude, longitude, name, opening_hours,
            instructions, about, open_on_weekends, images })
        
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    },
    async index(req: Request, res: Response) {
        const orphanagesRespository = getRepository(Orphanage)

        const orphanages = await orphanagesRespository.find({
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },
    
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanagesRespository = getRepository(Orphanage)

        const orphanages = await orphanagesRespository.findOneOrFail(id, {
            relations: ['images']
        })

        return res.json(orphanageView.render(orphanages))
    }
}