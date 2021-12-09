import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import UpdateUserInfoVarejista from '../services/UpdateUserInfoVarejista';
import { getRepository, getManager } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/Users';
import Interests from '../models/Interests';
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

usersRouter.patch('/completeRegister', ensureAuthenticated, async (request, response) => {
    const {name, description, telephone, city, uf, district, number, street} = request.body;

    const updateUserInfoVarejista = new UpdateUserInfoVarejista();

    const user = await updateUserInfoVarejista.execute({
      id: request.user.id,
      name,
      description,
      telephone,
      city,
      uf,
      district,
      number,
      street
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

usersRouter.get('/similarInterests', ensureAuthenticated, async (request, response) => {
  const manager = getManager();
  const interestsRepository = getRepository(Interests);

  const type = request.user.type === 1 ? 2 : 1;

  const interestsUser = await interestsRepository.find({
    where: {user_id: request.user.id}
  });

  if(interestsUser.length > 0) {
    const descriptionInterests = interestsUser.map(interest => `'${interest.description}'`);
    const formatDescriptions = descriptionInterests.join(',');

    const query = `select users.id, users.telephone, users.name, users.avatar from users
    left join interests on users.id = interests.user_id
    where interests.user_id != '${request.user.id}' and type = ${type} and interests.description in (${formatDescriptions})
    group by users.id`;

    const users = await manager.query(query);
    return response.json(users);
  }

  return response.json([]);
});

usersRouter.get('/filter', ensureAuthenticated, async (request, response) => {
  const manager = getManager();
  const {name, interest, product} = request.query;
  const type = request.user.type === 1 ? 2 : 1;
  if(!name && !interest && !product){
    let query = `select users.id, users.telephone, users.name, users.avatar from users
    where users.type = ${type}`;
    const users = await manager.query(query);
    return response.json(users);
  }

  let query = `
    select users.id, users.telephone, users.name, users.avatar from users
    left join interests on users.id = interests.user_id
    left join products on users.id = products.user_id
    where users.id != '${request.user.id}' and users.type = ${type} and
    (users.name = '${name || ''}' OR interests.description = '${interest || ''}' OR products.name = '${product || ''}')
    group by users.id
  `;
  console.log(query);
  const users = await manager.query(query);

  return response.json(users);
});

usersRouter.get('/infoUser/:id', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);
  const { id } = request.params;

  const user = await userRepository.findOne({
    where: {id},
    join: {
      alias: "users",
      leftJoinAndSelect: {
        address: "users.address",
        interest: "users.interest",
        products: "users.products"
      }
    }
  })

  if(!user){
    throw new AppError('Usuário não encontrado!');
  }

  return response.json(user);
});

export default usersRouter;
