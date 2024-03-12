import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { ConfigModule } from '@nestjs/config';
import { UsersModules } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ConfigModule.forRoot({}),
    UsersModules,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
