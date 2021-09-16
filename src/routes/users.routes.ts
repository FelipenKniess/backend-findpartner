import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserInfoRetail from '../services/UpdateUserInfoRetail';
import { getRepository } from 'typeorm';
import User from '../models/Users';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

export interface UserData {
    name: String,
    email: String,
    password?: string,
    type: Number
}

usersRouter.post('/create', async (request, response, next) => {

    const {type, name, email, password} = request.body;
    const createUser = new CreateUserService();

    const newUser: UserData = await createUser.execute({
        name,
        email,
        password,
        type
    });

    delete newUser.password;

    response.json(newUser);
});

usersRouter.put('/completeRegisterRetail', ensureAuthenticated, async (request, response, next) => {

    const {description, telephone} = request.body;

    const updateUserRetail = new UpdateUserInfoRetail();

    updateUserRetail.execute({
      id: request.user.id,
      description,
      telephone
    });
});

usersRouter.put('/completeRegisterProvider', ensureAuthenticated, async (request, response, next) => {

    response.json({ok: true});
});

usersRouter.get('/allUsers', ensureAuthenticated, async (request, response, next) => {
  const userRepository = getRepository(User);

  const type = request.user.type == 0 ? 1 : 0;

  const users = await userRepository.find({
    where: {type}
  })

  return response.json(users);
});


// usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async(request, response) => {

//     const UpdateAvatar = new UpdateUserAvatarService();

//     const user: User = await UpdateAvatar.execute({
//         user_id: request.user.id,
//         avatarFileName: request.file.filename
//     })

//     delete user.password;

//     return response.json(user);
// });

export default usersRouter;
