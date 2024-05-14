import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from './product';

export class CreateProductDto extends ProductEntity {
  @ApiProperty({ example: 'prod-6' })
  id: string;

  @ApiProperty({ example: 'Cebola empanada' })
  name: string;

  @ApiProperty({ example: 'Anéis de cebola empanados' })
  description: string;

  @ApiProperty({ example: 'cat-2' })
  categoryId: string;

  @ApiProperty({ example: 15 })
  price: number;
}
