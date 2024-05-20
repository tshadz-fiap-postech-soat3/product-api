import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../../src/@core/category/controller/categories.controller';
import { ICategoriesService } from '../../../src/@core/category/icategories.service';

import { ApplicationResult } from '../../../src/@core/application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../../src/@core/application/applicationResult/application-result-events';
import { ResultStatus } from '../../../src/@core/application/result/result-status';
import { createCategoryDtoFixture } from '../../../test/fixture/category-fixture';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let categoriesService: ICategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: ICategoriesService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<ICategoriesService>(ICategoriesService);
  });

  describe('create', () => {
    it('should return an ApplicationResult with ERROR event if category already exists', async () => {
      const createCategoryDto = createCategoryDtoFixture();
      const messageError = 'Category already exists';

      jest.spyOn(categoriesService, 'findOne').mockResolvedValueOnce({
        errorMessage: messageError,
        status: ResultStatus.ERROR,
      });

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.ERROR, messageError),
      );
    });
    it('should return an error if unable to create the category', async () => {
      const createCategoryDto = createCategoryDtoFixture();
      const messageError = 'Not able to create the category';

      jest
        .spyOn(categoriesService, 'findOne')
        .mockResolvedValue(Promise.resolve(null));

      jest.spyOn(categoriesService, 'create').mockResolvedValueOnce({
        errorMessage: messageError,
        status: ResultStatus.ERROR,
      });

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.ERROR, messageError),
      );
    });

    it('should return a success message if category is created', async () => {
      const createCategoryDto = createCategoryDtoFixture();

      jest
        .spyOn(categoriesService, 'findOne')
        .mockResolvedValue(Promise.resolve(null));

      jest.spyOn(categoriesService, 'create').mockResolvedValueOnce({
        data: createCategoryDto,
        status: ResultStatus.SUCCESS,
      });

      const result = await controller.create(createCategoryDto);

      expect(result).toEqual(
        new ApplicationResult(ApplicationResultEvents.SUCCESS_CREATED, {
          data: createCategoryDto,
          status: ResultStatus.SUCCESS,
        }),
      );
    });
  });
});
