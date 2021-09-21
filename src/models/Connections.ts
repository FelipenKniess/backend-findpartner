import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from './Users';

@Entity('connections')
class Connections {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_interest_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_interest_id' })
    user_interest: User;

    @Column()
    user_interested_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_interested_id' })
    user_interested: User;

    @Column()
    match: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Connections;
