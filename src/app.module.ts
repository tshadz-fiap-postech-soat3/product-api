import { Module } from '@nestjs/common';
import { ProductsModule } from './@core/products/products.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './@core/category/categories.module';
import { HealthController } from './health.controller';
@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
  controllers: [HealthController],
})
export class AppModule {}
