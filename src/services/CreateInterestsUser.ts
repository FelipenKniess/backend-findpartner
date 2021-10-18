import { getRepository} from 'typeorm';
import Interests from '../models/Interests';
import UserInterest from '../models/UserInterest';

interface Request {
    interests: Interests [];
    user_id: string
}

class CreateInterestsUser {
    public async execute({ user_id, interests }: Request): Promise<any>{
        const interestsRepository = getRepository(Interests);

        const allInterests = await interestsRepository.find()
        var interestsNotRegisters = interests;

        for (var i = 0; i < allInterests.length; i++) {
            for (var j = 0; j < interests.length; j++) {
                if(allInterests[i].description == interests[j].description){
                    interestsNotRegisters.splice(j, 1);
                }
            }
        }

        if(interestsNotRegisters.length > 0){
            await interestsRepository.insert(interestsNotRegisters);
        }

        const userInterestRepository = getRepository(UserInterest);
        //cadastrar na tabela de user_interest
        return [];

    }
}

export default CreateInterestsUser;
