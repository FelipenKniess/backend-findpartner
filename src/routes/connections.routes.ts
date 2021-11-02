import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateConnectionService from '../services/CreateConnectionService';
import { getRepository } from 'typeorm';
import Connection from '../models/Connections';

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
  const connectionsRepository = getRepository(Connection);

  const connectionsUser = await connectionsRepository.find({
    where:[{
        user_interest_id: request.user.id,
        match: true
      },
      {
        user_interested_id:request.user.id,
        match: true
      }
    ]
  });

  response.json(connectionsUser);
})

export default connectionsRouter;
