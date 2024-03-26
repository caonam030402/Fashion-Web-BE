import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModules } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { OdersModule } from './oders/oders.module';
import { OdersController } from './oders/oders.controller';

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
    OdersModule,
  ],
  controllers: [OdersController],
  providers: [],
})
export class AppModule {}
