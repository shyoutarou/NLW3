import { Request, Response } from "express"
import { getRepository } from "typeorm"
import bcrypt from 'bcrypt'
import * as Yup from 'yup'
import User from "../database/models/User"
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'

export default {
    async create(req: Request, res: Response) {

        const { name, email, password } = req.body
        const userRepository = getRepository(User)

        const schema = Yup.object().shape({
            name: Yup.string().max(15, 'Seu nome deve ter no máximo 15 caracteres.')
                .min(2, 'Seu nome deve ter no mínimo 2 caracteres.').required('O nome é obrigatório!'),
            email: Yup.string().email('Email inválido!').required('O email é obrigatório!'),
            password: Yup.string().required('A senha é obrigatória!')
        })
        
        await schema.validate({ name, email, password }, { abortEarly: false })
        
        
        const user = new User()
        user.name = name
        user.email = email
        user.password = password

        await userRepository.save(user)
        
        return res.status(200).json(user)
    },
    
    async login(req: Request, res: Response) {

        const { email, password } = req.body

        const schema = Yup.object().shape({
            email: Yup.string().email('Email inválido!').required('O email é obrigatório!'),
            password: Yup.string().required('Senha é obrigatória!')
        })

        const userRepository = getRepository(User)

        const user = await userRepository.findOne({
            where: { email }
        })

        if(!user) {
            return res.status(500).json({ message: 'Usuário não encontrado!' })
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(500).json({ message: 'Senha incorreta!' })
        }

        const token = jwt.sign({ id: user.id }, key, { expiresIn: 86400 })

        return res.status(200).json({ user, token })
    },
    async verifyToken(req: Request, res: Response) {

        const userRepository = getRepository(User)

        const user = await userRepository.findOne(req.body.userId)

        return res.status(200).json(user)

    }
}