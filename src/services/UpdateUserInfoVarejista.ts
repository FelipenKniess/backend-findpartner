import User from '../models/Users';
import {getRepository} from 'typeorm';
import AppError from "../errors/AppError";
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
    id: string,
    description: string,
    telephone: string,
}

class UpdateUserInfoVarejista {
    public async execute({id, description, telephone}: Request): Promise<User>{
      const userRepository = getRepository(User);

      const UserFind = await userRepository.findOne(id);

      if(!UserFind){
        throw new AppError('Only authenticated users can update data');
      }

      UserFind.description = description;
      UserFind.telephone = telephone;

      await userRepository.save(UserFind);

      return UserFind;
    }
}

export default UpdateUserInfoVarejista;
