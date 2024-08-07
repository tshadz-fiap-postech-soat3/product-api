import { Test, TestingModule } from '@nestjs/testing';
import { ProductsApi } from '../../../src/external/driver/products.api';
import { IProductsRepository } from '../../../src/@core/products/repositories/iproduct.repository';
import { PrismaProductsRepository } from '../../../src/@core/products/repositories/prisma-products-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ProductsService } from '../../../src/@core/products/products.service';
import { ProductsController } from '../../../src/@core/products/controller/products.controller';
import { IProductsService } from '../../../src/@core/products/iproducts.service';
import {
  createProductDtoFixture,
  productsFixture,
  updateProductDtoFixture,
} from '../../fixture/product-fixture';
import { ApplicationResult } from '../../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../../src/@core/application/applicationResult/application-result-events';
import { ResultStatus } from '../../../src/@core/application/result/result-status';

describe('ProductsApi', () => {
  let productsApi: ProductsApi;
  let productsController: ProductsController;

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

    productsApi = module.get<ProductsApi>(ProductsApi);
    productsController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productsApi).toBeDefined();
  });

  it('should create a new category', async () => {
    const createCustomerDto = createProductDtoFixture();
    const result = updateProductDtoFixture();
    jest
      .spyOn(productsController, 'create')
      .mockResolvedValue(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          result as unknown as string,
        ),
      );

    expect(await productsApi.create(createCustomerDto)).toStrictEqual(
      new ApplicationResult(
        ApplicationResultEvents.SUCCESS_CREATED,
        result as unknown as string,
      ),
    );
    expect(productsController.create).toHaveBeenCalledWith(createCustomerDto);
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = productsFixture();
      jest.spyOn(productsController, 'findAll').mockResolvedValue({
        status: ResultStatus.SUCCESS,
        data: result,
      });

      expect(await productsApi.findAll()).toStrictEqual({
        status: ResultStatus.SUCCESS,
        data: result,
      }),
        expect(productsController.findAll).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update the data', async () => {
      const id = 'test-id';
      const updateProductDto = updateProductDtoFixture();

      jest.spyOn(productsController, 'update').mockResolvedValue({
        status: ResultStatus.SUCCESS,
        data: updateProductDto,
      });

      const result = await productsApi.update(id, updateProductDto);
      expect(result).toStrictEqual({
        status: ResultStatus.SUCCESS,
        data: updateProductDto,
      });
      expect(productsController.update).toHaveBeenCalledWith(
        id,
        updateProductDto,
      );
    });
  });
});
