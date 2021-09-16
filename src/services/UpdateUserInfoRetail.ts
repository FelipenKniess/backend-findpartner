import User from '../models/Users';
import {getRepository} from 'typeorm';

interface Request {
    id: string,
    description: string,
    telephone: string,
}

class UpdateUserInfoRetail {
    public async execute({id, description, telephone}: Request): Promise<void>{
      const userRepository = getRepository(User);

      const UserUpdated = await userRepository.update({
        id
      }, {
        description,
        telephone
      });

      // return UserUpdated;
    }
}

export default UpdateUserInfoRetail;
