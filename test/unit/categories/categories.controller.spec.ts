import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../../src/external/driver/categories.api';
import { CategoriesService } from '../../../src/@core/category/categories.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { ICategoriesRepository } from '../../../src/@core/category/repositories/icategory.repository';
import { PrismaCategoriesRepository } from '../../../src/@core/category/repositories/prisma-categories-repository';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: ICategoriesRepository,
          useClass: PrismaCategoriesRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
