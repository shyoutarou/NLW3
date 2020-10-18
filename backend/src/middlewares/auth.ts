import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { key } from '../auth.json'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    
    if(!header) {
        return res.status(500).json({ message: 'Token não enviado!' })
    }

    if(header.split(' ').length !== 2) {
        return res.status(500).json({ message: 'Formato de token inválidoa!' })
    }

    if(header.split(' ')[0] !== 'Bearer') {
        return res.status(500).json({ message: 'Formato de token inválido!' })
    }

    jwt.verify(header.split(' ')[1], key, (err, decoded: any) => {
        if(err) {
            return res.status(500).json({ message: 'Token expirado ou inválido!' })
        }

        req.body.userId = decoded.id

        next()
    })
}

export default authMiddleware