import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../models/Users';

@Entity('address')
class Address {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    uf: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    number: string;

    @Column()
    longitude?: string;

    @Column()
    latitude?: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

}

export default Address;
