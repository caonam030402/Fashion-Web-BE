import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModules } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './modules/oders/orders.module';
import { DiscountsModule } from './modules/discounts/discounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({}),
    UsersModules,
    AuthModule,
    ProductsModule,
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    OrdersModule,
    DiscountsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
