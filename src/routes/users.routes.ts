import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserInfoVarejista from '../services/UpdateUserInfoVarejista';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/Users';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateAvatarUser from '../services/UpdateAvatarUser';

const usersRouter = Router();
const upload = multer(uploadConfig);

export interface UserData {
    name: String,
    email: String,
    password?: string,
    type: Number
}

usersRouter.post('/create', async (request, response) => {

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

usersRouter.patch('/completeRegisterVarejista', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const {description, telephone} = request.body;

    const updateUserInfoVarejista = new UpdateUserInfoVarejista();

    const user = await updateUserInfoVarejista.execute({
      id: request.user.id,
      description,
      telephone,
    });

    return response.json({ user })
});

usersRouter.patch('/updateAvatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

  const updateUserInfoVarejista = new UpdateAvatarUser();

  const user = await updateUserInfoVarejista.execute({
    id: request.user.id,
    avatarFileName: request.file?.filename
  });

  return response.json({ user })
});

usersRouter.put('/completeRegisterFornecedor', ensureAuthenticated, async (request, response) => {

    response.json({ok: true});
});

usersRouter.get('/allUsers', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const type = request.user.type == 0 ? 1 : 0;

  const users = await userRepository.find({
    where: {type}
  })

  return response.json(users);
});

usersRouter.get('/tmp/:urlImage', async (request, response) => {
  const { urlImage } = request.params;
  response.sendFile('~/tmp/a15d7bf341895241607a-196519269_502993670900698_6107771621136932481_n.jpg');
});

usersRouter.get('/infoUser/:id', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);
  const { id } = request.params;

  const user = await userRepository.findOne({
    where: {id}
  })

  if(!user){
    throw new AppError('Usuário não encontrado!');
  }

  return response.json(user);
});

export default usersRouter;
