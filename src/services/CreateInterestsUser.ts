import { getRepository} from 'typeorm';
import Interests from '../models/Interests';

interface Request {
    interests: Interests [];
    user_id: string
}

class CreateInterestsUser {

    public async execute({ user_id, interests }: Request): Promise<any>{
        const interestsRepository = getRepository(Interests);

        const dataInsert = interests.map((data) => {
            return {
                user_id,
                description: data.description
            }
        })

        interestsRepository.insert(dataInsert);

        return dataInsert;
    }
}


export default CreateInterestsUser;
