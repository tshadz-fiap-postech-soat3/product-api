import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/external/driver/products.api';
import { ProductsService } from '../../../src/@core/products/controller/products.controller';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import { PrismaProductsRepository } from '../../../src/@core/products/repositories/prisma-products-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: IProductsRepository,
          useClass: PrismaProductsRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
