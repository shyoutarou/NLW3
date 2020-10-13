import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../database/models/Orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

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

        const data = { latitude, longitude, name, opening_hours,
            instructions, about, open_on_weekends, images }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const orphanage = orphanagesRepository.create(data)
        
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