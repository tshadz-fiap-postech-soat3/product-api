import { Test, TestingModule } from '@nestjs/testing';
import { ProductsApi } from '../../../src/external/driver/products.api';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import { PrismaProductsRepository } from '../../../src/@core/products/repositories/prisma-products-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ProductsService } from '../../../src/@core/products/products.service';
import { ProductsController } from '../../../src/@core/products/controller/products.controller';
import { IProductsService } from '../../../src/@core/products/iproducts.service';

describe('ProductsApi', () => {
  let controller: ProductsApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsApi],
      providers: [
        ProductsController,
        {
          provide: IProductsService,
          useClass: ProductsService,
        },
        ProductsService,
        {
          provide: IProductsRepository,
          useClass: PrismaProductsRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<ProductsApi>(ProductsApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
