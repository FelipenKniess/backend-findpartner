import { getRepository } from 'typeorm';
import Connection from '../models/Connections';
import AppError from '../errors/AppError';

interface Request {
    user_interest_id: string,
    user_interested_id: string,
}

class CreateConnectionService {
    public async execute({user_interest_id, user_interested_id}: Request): Promise<Connection>{
        const connectionsRepository = getRepository(Connection);

        if(user_interest_id === user_interested_id){
          throw new AppError('Você não pode realizar conexões com você mesmo!');
        }

        const alreadyExistConnection = await connectionsRepository.findOne({
          where: [
            {user_interest_id, user_interested_id, match: true},
            {user_interest_id: user_interested_id, user_interested_id: user_interest_id, match: true}
          ]
        })

        if(alreadyExistConnection) {
          throw new AppError('Esta conexão já existe!');
        }

        const alreadyExistInterested = await connectionsRepository.findOne({
          where: [
            {user_interest_id, user_interested_id}
          ]
        })

        if(alreadyExistInterested) {
          throw new AppError('Você já se interessou nesse usuário!');
        }

        const alreadyExistInterest = await connectionsRepository.findOne({
          where: {user_interest_id: user_interested_id, user_interested_id: user_interest_id}
        })

        if(alreadyExistInterest) {
          alreadyExistInterest.match = true;
          await connectionsRepository.save(alreadyExistInterest);
          return alreadyExistInterest;
        }

        const newRegister = connectionsRepository.create({
          user_interest_id,
          user_interested_id,
          match: false
        })

        await connectionsRepository.save(newRegister);

        return newRegister;
    }
}

export default CreateConnectionService;
