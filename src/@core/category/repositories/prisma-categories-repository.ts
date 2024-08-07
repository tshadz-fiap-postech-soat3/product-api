import { Injectable } from '@nestjs/common';
import { ICategoriesRepository } from './icategory.repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { CreateCategoryDto } from '../entitites/create-category.dto';
import { UpdateCategoryDto } from '../entitites/update-category.dto';
import { CategoryEntity } from '../entitites/category';

@Injectable()
export class PrismaCategoriesRepository implements ICategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async insert(category: CreateCategoryDto): Promise<CategoryEntity> {
    return await this.prisma.category.create({
      data: category,
    });
  }

  async update(
    id: string,
    category: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.prisma.category.update({
      data: category,
      where: {
        id: id,
      },
    });
  }

  async findById(id: string): Promise<CategoryEntity> {
    return await this.prisma.category.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.prisma.category.findMany();
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
