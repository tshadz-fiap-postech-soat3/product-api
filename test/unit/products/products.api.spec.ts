import { Test, TestingModule } from '@nestjs/testing';
import { ProductsApi } from '../../../src/external/driver/products.api';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import { ProductsController } from '../../../src/@core/products/controller/products.controller';
import { IProductsService } from '../../../src/@core/products/iproducts.service';
import {
  createProductDtoFixture,
  updateProductDtoFixture,
} from '../../fixture/product-fixture';
import { ApplicationResult } from '../../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../../src/@core/application/applicationResult/application-result-events';
import { ResultStatus } from '../../../src/@core/application/result/result-status';
import { ProductsService } from '../../../src/@core/products/products.service';
import { PrismaProductsRepository } from '../../../src/@core/products/repositories/prisma-products-repository';

describe('ProductsApi', () => {
  let productsApi: ProductsApi;
  let ProductController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsApi],
      providers: [
        ProductsController,
        {
          provide: IProductsService,
          useClass: ProductsService,
        },
        {
          provide: IProductsRepository,
          useClass: PrismaProductsRepository,
        },
        PrismaService,
      ],
    }).compile();

    productsApi = module.get<ProductsApi>(ProductsApi);
    ProductController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsApi).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createProductDto = createProductDtoFixture();
      const result = updateProductDtoFixture();
      jest
        .spyOn(ProductController, 'create')
        .mockResolvedValue(
          new ApplicationResult(
            ApplicationResultEvents.SUCCESS_CREATED,
            result as unknown as string,
          ),
        );

      expect(await productsApi.create(createProductDto)).toStrictEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          result as unknown as string,
        ),
      );
      expect(ProductController.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of Product', async () => {
      const result = [createProductDtoFixture()];
      jest.spyOn(ProductController, 'findAll').mockResolvedValue({
        status: ResultStatus.SUCCESS,
        data: result,
      });

      expect(await productsApi.findAll()).toStrictEqual({
        status: ResultStatus.SUCCESS,
        data: result,
      }),
        expect(ProductController.findAll).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update the data', async () => {
      const id = 'prod-2';
      const updateProductDto = updateProductDtoFixture();

      jest.spyOn(ProductController, 'update').mockResolvedValue({
        status: ResultStatus.SUCCESS,
        data: updateProductDto,
      });

      await productsApi.update(id, updateProductDto);

      expect(ProductController.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });
  });
});
