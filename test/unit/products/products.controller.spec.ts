import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../../src/@core/products/controller/products.controller';
import { IProductsService } from '../../../src/@core/products/iproducts.service';

import { ApplicationResult } from '../../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../../src/@core/application/applicationResult/application-result-events';

import { createProductDtoFixture } from '../../../test/fixture/product-fixture';
import { ResultStatus } from '../../../src/@core/application/result/result-status';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: IProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: IProductsService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<IProductsService>(IProductsService);
  });

  describe('create', () => {
    it('should return an error if product already exists', async () => {
      const createProductDto = createProductDtoFixture();
      const messageError = 'Product already exists';

      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce({
        errorMessage: messageError,
        status: ResultStatus.ERROR,
      });

      const result = await controller.create(createProductDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.ERROR, messageError),
      );
    });

    it('should return an error if unable to create the product', async () => {
      const createProductDto = createProductDtoFixture();
      const messageError = 'Not able to create the product';

      jest
        .spyOn(productsService, 'findOne')
        .mockResolvedValue(Promise.resolve(null));

      jest.spyOn(productsService, 'create').mockResolvedValueOnce({
        errorMessage: messageError,
        status: ResultStatus.ERROR,
      });

      const result = await controller.create(createProductDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.ERROR, messageError),
      );
    });

    it('should return a success message if product is created', async () => {
      const createProductDto = createProductDtoFixture();

      jest
        .spyOn(productsService, 'findOne')
        .mockResolvedValue(Promise.resolve(null));

      jest.spyOn(productsService, 'create').mockResolvedValueOnce({
        data: createProductDto,
        status: ResultStatus.SUCCESS,
      });

      const result = await controller.create(createProductDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.SUCCESS_CREATED, {
          data: createProductDto,
          status: ResultStatus.SUCCESS,
        }),
      );
    });
  });
});
