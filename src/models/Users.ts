import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Address from './Address';
import Interest from './Interests';
import Products from './Products';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    type: number;

    @Column()
    avatar: string;

    @Column()
    description: string;

    @Column()
    telephone: string;

    @OneToMany(() => Address, address => address.user)
    address: Address;

    @OneToMany(() => Interest, interest => interest.user)
    interest: Interest;

    @OneToMany(() => Products, products => products.user)
    products: Products;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default User;
