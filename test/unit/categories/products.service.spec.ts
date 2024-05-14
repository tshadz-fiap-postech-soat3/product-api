import { Test, TestingModule } from '@nestjs/testing';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { PrismaProductsRepository } from '../../../src/@core/products/repositories/prisma-products-repository';
import { ProductsService } from '../../../src/@core/products/products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: IProductsRepository,
          useClass: PrismaProductsRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
