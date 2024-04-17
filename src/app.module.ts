import { Module } from '@nestjs/common';
import { CustomersModule } from './@core/customer/customers.module';
import { ProductsModule } from './@core/products/products.module';
import { OrdersModule } from './@core/order/orders.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './@core/category/categories.module';
import { OrderItemsModule } from './@core/order-item/order-items.module';
import { PaymentsModule } from './external/driven/payment/payments.module';

@Module({
  imports: [
    CustomersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    DatabaseModule,
    PaymentsModule,
    ConfigModule.forRoot(),
    OrderItemsModule,
  ],
})
export class AppModule {}
