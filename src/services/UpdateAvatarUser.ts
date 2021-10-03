import User from '../models/Users';
import {getRepository} from 'typeorm';
import AppError from "../errors/AppError";
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
    id: string,
    avatarFileName?: string,
}

class UpdateAvatarUser {
    public async execute({id, avatarFileName}: Request): Promise<User>{
      const userRepository = getRepository(User);

      const UserFind = await userRepository.findOne(id);

      if(!UserFind){
        throw new AppError('Only authenticated users can change avatar');
      }

      if(UserFind.avatar){
        const userAvatarFilePath = path.join(uploadConfig.directory, UserFind.avatar);
        const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

        if(userAvatarFileExist) {
            await fs.promises.unlink(userAvatarFilePath)
        }
      }

      if(avatarFileName) {
        UserFind.avatar = avatarFileName;
      }

      await userRepository.save(UserFind);

      return UserFind;
    }
}

export default UpdateAvatarUser;
