import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateInterestsUser from '../services/CreateInterestsUser';
import { getRepository} from 'typeorm';
import Interests from '../models/Interests';

const interestsRouter = Router();

interestsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { interest } = request.body;

  const createInterestsUser = new CreateInterestsUser();

  const interestsUser = await createInterestsUser.execute({
    user_id: request.user.id,
    interest
  })

  response.json(interestsUser);

});

interestsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const interestsRepository = getRepository(Interests);

  const interestsUser = await interestsRepository.find({
    where: {user_id: request.user.id}
  });

  response.json(interestsUser);
})

interestsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const interestsRepository = getRepository(Interests);

  const interestsUser = await interestsRepository.delete({
    id
  });

  response.json(interestsUser);
})

export default interestsRouter;
