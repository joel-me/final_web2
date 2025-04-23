import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Buruh } from './buruh.entity';
import { User } from '../user/user.entity';
import { BuruhService } from './buruh.service';
import { BuruhController } from './buruh.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Buruh, User])],
  providers: [BuruhService],
  controllers: [BuruhController],
})
export class BuruhModule {}
