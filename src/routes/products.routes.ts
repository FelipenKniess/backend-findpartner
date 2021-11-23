import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { getRepository} from 'typeorm';
import Products from '../models/Products';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateProductImageService from '../services/UpdateProductImageService';
import AppError from "../errors/AppError";

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { name, price } = request.body;
  const productsRepository = getRepository(Products);

  const newProduct = productsRepository.create({
    user_id: request.user.id,
    name,
    price
  })

  await productsRepository.save(newProduct);

  response.json(newProduct);
});

productsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { name, price } = request.body;
  const { id } = request.params;
  const productsRepository = getRepository(Products);

  const ProductFind = await productsRepository.findOne(id);

  if(!ProductFind){
    throw new AppError('Product not found!');
  }

  if(ProductFind) {
    ProductFind.name = name;
    ProductFind.price = price;
  }

  await productsRepository.save(ProductFind);

  response.json(ProductFind);
});

productsRouter.patch('/updateImageProduct', ensureAuthenticated, upload.single('imgProduct'), async (request, response) => {
  const { productId } = request.body;
  const updateProductImage = new UpdateProductImageService();

  const product = await updateProductImage.execute({
    productId,
    productFileName: request.file?.filename
  });

  return response.json({ product })
});

productsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const productsRepository = getRepository(Products);

  const ProductsUser = await productsRepository.find({
    where: {user_id: request.user.id}
  });

  response.json(ProductsUser);
});

productsRouter.get('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const productsRepository = getRepository(Products);

  const ProductsUser = await productsRepository.findOne({
    where: {
      user_id: request.user.id,
      id
    }
  });

  response.json(ProductsUser);
});

productsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const productRepository = getRepository(Products);

  const productUser = await productRepository.delete({
    id
  });

  response.json(productUser);
});

export default productsRouter;
