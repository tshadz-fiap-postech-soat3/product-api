import { CreateCategoryDto } from 'src/@core/category/entitites/create-category.dto';
import { UpdateCategoryDto } from 'src/@core/category/entitites/update-category.dto';

export const createCategoryDtoFixture = (): CreateCategoryDto => ({
  id: 'cat-5',
  name: 'toy',
  createdAtDate: new Date(),
  updatedAtDate: new Date(),
});

export const updateCategoryDtoFixture = (): UpdateCategoryDto => ({
  name: 'toy',
  updatedAtDate: new Date(),
});

export const categoriesFixture = () => [
  {
    id: 'cat-5',
    name: 'toy',
    createdAtDate: new Date(),
    updatedAtDate: new Date(),
  },
  {
    id: 'cat-6',
    name: 'drinks',
    createdAtDate: new Date(),
    updatedAtDate: new Date(),
  },
];

export const updateCategoryRepositoryFixture = (): any => ({
  id: 'cat-5',
  name: 'toy',
  createdAtDate: new Date(),
  updatedAtDate: new Date(),
});
