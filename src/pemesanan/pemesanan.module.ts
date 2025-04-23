import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pemesanan } from './pemesanan.entity';
import { User } from '../user/user.entity';
import { PemesananService } from './pemesanan.service';
import { PemesananController } from './pemesanan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pemesanan, User])],
  providers: [PemesananService],
  controllers: [PemesananController],
})
export class PemesananModule {}
