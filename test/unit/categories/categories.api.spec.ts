import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesApi } from '../../../src/external/driver/categories.api';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { PrismaCategoriesRepository } from '../../../src/@core/category/repositories/prisma-categories-repository';
import { CategoriesController } from '../../../src/@core/category/controller/categories.controller';
import { ICategoriesService } from '../../../src/@core/category/icategories.service';
import {
  createCategoryDtoFixture,
  updateCategoryRepositoryFixture,
} from '../../fixture/category-fixture';
import { ApplicationResult } from '../../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../../src/@core/application/applicationResult/application-result-events';
import { ResultStatus } from '../../../src/@core/application/result/result-status';

describe('CategoriesApi', () => {
  let categoriesApi: CategoriesApi;
  let categoriesController: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesApi],
      providers: [
        CategoriesController,
        {
          provide: ICategoriesService,
          useClass: CategoriesService,
        },
        {
          provide: ICategoriesRepository,
          useClass: PrismaCategoriesRepository,
        },
        PrismaService,
      ],
    }).compile();

    categoriesApi = module.get<CategoriesApi>(CategoriesApi);
    categoriesController = module.get<CategoriesController>(CategoriesApi);
  });

  it('should be defined', () => {
    expect(categoriesApi).toBeDefined();
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createCustomerDto = createCategoryDtoFixture();
      const result = updateCategoryRepositoryFixture();
      jest
        .spyOn(categoriesController, 'create')
        .mockResolvedValue(
          new ApplicationResult(
            ApplicationResultEvents.SUCCESS_CREATED,
            result as unknown as string,
          ),
        );

      expect(await categoriesApi.create(createCustomerDto)).toStrictEqual(
        new ApplicationResult(
          ApplicationResultEvents.SUCCESS_CREATED,
          result as unknown as string,
        ),
      );
      expect(categoriesController.create).toHaveBeenCalledWith(
        createCustomerDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const result = [createCategoryDtoFixture()];
      jest.spyOn(categoriesController, 'findAll').mockResolvedValue({
        status: ResultStatus.SUCCESS,
        data: result,
      });

      expect(await categoriesApi.findAll()).toStrictEqual({
        status: ResultStatus.SUCCESS,
        data: result,
      }),
        expect(categoriesController.findAll).toHaveBeenCalled();
    });
  });
  describe('update', () => {
    it('should update the data', async () => {
      const id = 'test-id';
      const updateCategoryDto = updateCategoryRepositoryFixture();

      jest
        .spyOn(categoriesController, 'update')
        .mockResolvedValue(updateCategoryDto);

      const result = await categoriesApi.update(id, updateCategoryDto);

      expect(result).toBe(updateCategoryDto);
      expect(categoriesController.update).toHaveBeenCalledWith(
        id,
        updateCategoryDto,
      );
    });
  });
});
