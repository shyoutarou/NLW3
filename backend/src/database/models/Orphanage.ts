import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'
import Image from './Image'
import User from './User'

@Entity('orphanages')
export default class Orphanage {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    about: string

    @Column()
    instructions: string

    @Column()
    opening_hours: string

    @Column()
    open_on_weekends: boolean

    @Column()
    user_id: number

    @OneToMany(type => Image, image => image.orhpanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Image[]

    @ManyToOne(type => User, user => user.orphanages)
    @JoinColumn({ name: 'user_id' })
    user: User
}