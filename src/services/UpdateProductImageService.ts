import Product from '../models/Products';
import {getRepository} from 'typeorm';
import AppError from "../errors/AppError";
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
    productId: string,
    productFileName?: string,
}

class UpdateProductImageService {
    public async execute({productId, productFileName}: Request): Promise<Product>{
      const productRepository = getRepository(Product);

      const ProductFind = await productRepository.findOne(productId);

      if(!ProductFind){
        throw new AppError('Product not found!');
      }

      if(ProductFind.image_product){
        const productImageFilePath = path.join(uploadConfig.directory, ProductFind.image_product);
        const productImageFileExist = await fs.promises.stat(productImageFilePath);

        if(productImageFileExist) {
            await fs.promises.unlink(productImageFilePath)
        }
      }

      if(productFileName) {
        ProductFind.image_product = productFileName;
      }

      await productRepository.save(ProductFind);

      return ProductFind;
    }
}

export default UpdateProductImageService;
