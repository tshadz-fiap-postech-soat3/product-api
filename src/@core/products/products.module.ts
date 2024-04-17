import { Module } from '@nestjs/common';
import { IProductsRepository } from './repositories/iproduct.repository';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { PrismaProductsRepository } from './repositories/prisma-products-repository';
import { ProductsController } from './controller/products.controller';
import { ProductsApi } from '../../external/driver/products.api';
import { IProductsService } from './iproducts.service';
import { ProductsService } from './products.service';
import { IProductsController } from './controller/iproducts-controller';

@Module({
  controllers: [ProductsApi],
  providers: [
    PrismaProductsRepository,
    {
      provide: IProductsRepository,
      useClass: PrismaProductsRepository,
    },
    ProductsService,
    {
      provide: IProductsService,
      useClass: ProductsService,
    },
    ProductsController,
    {
      provide: IProductsController,
      useClass: ProductsController,
    },
    PrismaService,
  ],
})
export class ProductsModule {}
