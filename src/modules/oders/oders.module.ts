import { Module } from '@nestjs/common';
import { OdersController } from './oders.controller';
import { OdersService } from './oders.service';

@Module({
  controllers: [OdersController],
  providers: [OdersService],
})
export class OdersModule {}
