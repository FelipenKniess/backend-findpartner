import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/Users';
import AuthConfig from './../config/auth';
import appError from '../errors/AppError';

interface Request {
    email: string,
    password: string
}

interface Response {
    user: User,
    token: String
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<Response>{
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
          where: {email}
        })

        if(!user){
          throw new appError('Usuário ou senha está incorreto');
        }

        const validatePassword = await compare(password, user.password);

        if(!validatePassword){
          throw new appError('Usuário ou senha está incorreto');
        }

        const { secret, expiresIn } = AuthConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn:expiresIn,
        });

        return {
            user,
            token
        };

    }
}

export default AuthenticateUserService;
