import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateInterestsUser from '../services/CreateInterestsUser';

const interestsRouter = Router();

interestsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { interests } = request.body;

  const createInterestsUser = new CreateInterestsUser();

  const interestsUser = await createInterestsUser.execute({
    user_id: request.user.id,
    interests
  })

  response.json(interestsUser);

});

interestsRouter.get('/', ensureAuthenticated, async (request, response) => {
  response.json({ok: true})
})

export default interestsRouter;
