import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Orphanage from './Orphanage'

@Entity('users')
class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(type => Orphanage, orphanage => orphanage.user)
    @JoinColumn({ name: 'user_id' })
    orphanages: Orphanage[]

}

export default User