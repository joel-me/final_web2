import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petani } from './petani.entity';
import { PetaniService } from './petani.service';
import { PetaniController } from './petani.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Petani])],
  providers: [PetaniService],
  controllers: [PetaniController],
})
export class PetaniModule {}
