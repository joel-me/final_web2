import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { UserModule } from './user/user.module';
import { PetaniModule } from './petani/petani.module';
import { BuruhModule } from './buruh/buruh.module';
import { PemesananModule } from './pemesanan/pemesanan.module'; // Tambahkan module Pemesanan

import { User } from './user/user.entity';
import { Petani } from './petani/petani.entity';
import { Buruh } from './buruh/buruh.entity';
import { Pemesanan } from './pemesanan/pemesanan.entity'; // Entitas yang terkait

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // agar bisa dipakai di semua module tanpa import ulang
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: 5432, // Sesuaikan dengan port DB jika diperlukan
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      entities: [User, Petani, Buruh, Pemesanan], // Daftar entitas
      synchronize: true, // Tentukan jika kamu ingin otomatis menyinkronkan entitas dengan DB
      ssl: {
        rejectUnauthorized: false, // Sesuaikan jika perlu dengan pengaturan SSL
      },
    }),
    UserModule,
    PetaniModule,
    BuruhModule,
    PemesananModule, // Tambahkan module Pemesanan
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
