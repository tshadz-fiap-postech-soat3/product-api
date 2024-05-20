import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { createCategoryDtoFixture } from '../../../test/fixture/category-fixture';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { ResultSuccess } from '../../../src/@core/application/result/result-success';
import { ResultError } from '../../../src/@core/application/result/result-error';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoriesRepository: ICategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: ICategoriesRepository,
          useValue: {
            insert: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<ICategoriesRepository>(
      ICategoriesRepository,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create categories', () => {
    it('should create a category', async () => {
      const createCategoryDto = createCategoryDtoFixture();

      jest
        .spyOn(categoriesRepository, 'insert')
        .mockResolvedValue(createCategoryDto);

      const response = await service.create(createCategoryDto);

      expect(response).toEqual(new ResultSuccess(createCategoryDto));
      expect(categoriesRepository.insert).toHaveBeenCalledWith(
        createCategoryDto,
      );
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = 'cat-50';
      const updateCategoryDto = createCategoryDtoFixture();
      const updatedProduct = { ...updateCategoryDto, id };

      jest
        .spyOn(categoriesRepository, 'update')
        .mockResolvedValue(updatedProduct);

      const result = await service.update(id, updateCategoryDto);

      expect(result).toEqual(new ResultSuccess(updatedProduct));
      expect(categoriesRepository.update).toHaveBeenCalledWith(
        id,
        updateCategoryDto,
      );
    });

    describe('find all categories', () => {
      it('should return all categories', async () => {
        const result = [
          {
            id: 'cat-1',
            name: 'category 1',
            createdAtDate: new Date(),
            updatedAtDate: new Date(),
          },
          {
            id: 'cat-2',
            name: 'category 2',
            createdAtDate: new Date(),
            updatedAtDate: new Date(),
          },
        ];

        jest.spyOn(categoriesRepository, 'findAll').mockResolvedValue(result);

        const response = await service.findAll();

        expect(response).toEqual(new ResultSuccess(result));
        expect(categoriesRepository.findAll).toHaveBeenCalled();
      });
      it('should return an error when no categories exist', async () => {
        jest
          .spyOn(categoriesRepository, 'findAll')
          .mockImplementation(undefined);

        const response = await service.findAll();

        expect(response).toEqual(new ResultError('Category not exist'));
        expect(categoriesRepository.findAll).toHaveBeenCalled();
      });

      describe('find one category', () => {
        it('should return a category by ID', async () => {
          const categoryId = 'cat-1';
          const result = {
            id: categoryId,
            name: 'category 1',
            createdAtDate: new Date(),
            updatedAtDate: new Date(),
          };

          jest
            .spyOn(categoriesRepository, 'findById')
            .mockResolvedValue(result);

          const response = await service.findOne(categoryId);

          expect(response).toEqual(new ResultSuccess(result));
          expect(categoriesRepository.findById).toHaveBeenCalledWith(
            categoryId,
          );
        });

        it('should return an error when the category does not exist', async () => {
          const categoryId = 'cat-1';

          const response = await service.findOne(categoryId);

          expect(response).toEqual(new ResultError('Category not exist'));
          expect(categoriesRepository.findById).toHaveBeenCalledWith(
            categoryId,
          );
        });
      });
    });

    describe('remove category', () => {
      it('should remove a category', async () => {
        const categoryId = 'cat-1';

        jest.spyOn(categoriesRepository, 'delete').mockResolvedValue();

        const response = await service.remove(categoryId);

        expect(response).toBe(undefined);
        expect(categoriesRepository.delete).toHaveBeenCalledWith(categoryId);
      });
    });
  });
});
