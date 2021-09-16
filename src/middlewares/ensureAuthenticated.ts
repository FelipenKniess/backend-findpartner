import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from './../config/auth';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
    const authHeader = request.headers.authorization;
    const userRepositroy = getRepository(User);

    if(!authHeader){
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        const user = await userRepositroy.findOne({
          where: {id: sub}
        });

        request.user = user;

        return next();
    } catch{
        throw new AppError('JWT token is invalid', 404);
    }
}
