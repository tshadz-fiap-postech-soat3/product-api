import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from './category';

export class CreateCategoryDto extends CategoryEntity {
  @ApiProperty({ example: 'cat-5' })
  id: string;

  @ApiProperty({ example: 'toy' })
  name: string;
}
