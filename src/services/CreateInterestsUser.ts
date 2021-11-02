import { getRepository} from 'typeorm';
import Interests from '../models/Interests';
import AppError from '../errors/AppError';

interface Request {
    interest: string;
    user_id: string
}

class CreateInterestsUser {

    public async execute({ user_id, interest }: Request): Promise<Interests>{
        const interestsRepository = getRepository(Interests);

        const checkInterestExist = await interestsRepository.findOne({
            where: {
                user_id,
                description:interest
            }
        });

        if(checkInterestExist) {
            throw new AppError('Esse interesse já está cadastrado!');
        }
        const newInterest = interestsRepository.create({
            description:interest,
            user_id
        })

        await interestsRepository.save(newInterest);

        return newInterest;
    }
}


export default CreateInterestsUser;
