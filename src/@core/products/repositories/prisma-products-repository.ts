import { Injectable } from '@nestjs/common';
import { IProductsRepository } from './iproduct.repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { UpdateProductDto } from '../entities/update-product.dto';
import { ProductEntity } from '../entities/product';
import { CreateProductDto } from '../entities/create-product.dto';

@Injectable()
export class PrismaProductsRepository implements IProductsRepository {
  constructor(private prisma: PrismaService) {}

  async insert(product: CreateProductDto): Promise<ProductEntity> {
    return await this.prisma.product.create({
      data: product,
    });
  }

  async update(id: string, product: UpdateProductDto): Promise<ProductEntity> {
    return await this.prisma.product.update({
      data: product,
      where: {
        id: id,
      },
    });
  }

  async findByCategory(category: string): Promise<ProductEntity | null> {
    return await this.prisma.product.findFirst({
      where: {
        categoryId: category,
      },
    });
  }

  async findByName(name: string): Promise<ProductEntity | null> {
    return await this.prisma.product.findFirst({
      where: {
        name: name,
      },
    });
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.prisma.product.findMany();
  }

  async delete(id: string): Promise<void> {
    this.prisma.product.delete({
      where: {
        id: id,
      },
    });
  }
}
