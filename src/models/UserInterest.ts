import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinColumn } from 'typeorm';
import User from '../models/Users';
import Interest from '../models/Interests';

@Entity('user_interest')
class UserInterest {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'user_id' })
    user?: User;

    @Column()
    user_id: string;

    @ManyToMany(() => Interest)
    @JoinColumn({ name: 'interest_id' })
    interest?: Interest;

    @Column()
    interest_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default UserInterest;
