import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateConnectionService from '../services/CreateConnectionService';

const connectionsRouter = Router();

connectionsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { user_interested_id } = request.body;

  const createConnectionService = new CreateConnectionService();

  const connection = await createConnectionService.execute({
    user_interest_id: request.user.id,
    user_interested_id
  })

  response.json(connection);

});

connectionsRouter.get('/', ensureAuthenticated, async (request, response) => {
  response.json({ok: true})
})

export default connectionsRouter;
