import { Injectable, Inject } from '@nestjs/common';
import { IProductsService } from './iproducts.service';
import { IProductsRepository } from './repositories/iproduct.repository';
import { CreateProductDto } from './entities/create-product.dto';
import { UpdateProductDto } from './entities/update-product.dto';
import { ResultError } from '../application/result/result-error';
import { ResultSuccess } from '../application/result/result-success';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(
    @Inject(IProductsRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const result = await this.productsRepository.insert(createProductDto);
    if (!result) {
      return new ResultError('Not able to create the product');
    }
    return new ResultSuccess(result);
  }

  async findAll() {
    const result = await this.productsRepository.findAll();
    if (!result) {
      return new ResultError('Product not exist');
    }
    return new ResultSuccess(result);
  }

  async findOne(category: string) {
    const result = await this.productsRepository.findByCategory(category);
    if (!result) {
      return new ResultError('Product not exist');
    }
    return new ResultSuccess(result);
  }

  async findByName(name: string) {
    const result = await this.productsRepository.findByName(name);
    if (!result) {
      return new ResultError('Product not exist');
    }
    return new ResultSuccess(result);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const result = await this.productsRepository.update(id, updateProductDto);
    if (!result) {
      return new ResultError('Not able to update the product');
    }
    return new ResultSuccess(result);
  }

  async remove(id: string) {
    await this.productsRepository.delete(id);
  }
}
