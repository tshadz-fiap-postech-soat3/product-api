import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../entities/create-product.dto';
import { UpdateProductDto } from '../entities/update-product.dto';
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../application/applicationResult/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IProductsController } from './iproducts-controller';
import { IProductsService } from '../iproducts.service';

@Injectable()
export class ProductsController implements IProductsController {
  constructor(
    @Inject(IProductsService)
    private productsService: IProductsService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productsService.findOne(createProductDto.name);
    if (product.status !== ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Product already exists',
      );
    }
    const createdProduct = await this.productsService.create(createProductDto);
    if (createdProduct.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the product',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      createdProduct as unknown as string,
    );
  }

  async findAll() {
    return await this.productsService.findAll();
  }

  async findOne(category: string) {
    return await this.productsService.findOne(category);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productsService.update(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productsService.remove(id);
  }
}
