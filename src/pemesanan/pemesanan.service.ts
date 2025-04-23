import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pemesanan } from './pemesanan.entity';
import { Repository } from 'typeorm';
import { CreatePemesananDto } from './dto/create-pemesanan.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PemesananService {
  constructor(
    @InjectRepository(Pemesanan)
    private readonly pemesananRepo: Repository<Pemesanan>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreatePemesananDto): Promise<Pemesanan> {
    const petani = await this.userRepo.findOneBy({ id: dto.petaniId });
    const buruh = await this.userRepo.findOneBy({ id: dto.buruhId });

    if (!petani || !buruh) throw new Error('Petani atau Buruh tidak ditemukan');

    const pemesanan = this.pemesananRepo.create({
      petani,
      buruh,
      tanggal: dto.tanggal,
      catatan: dto.catatan,
    });

    return this.pemesananRepo.save(pemesanan);
  }

  async findAll(): Promise<Pemesanan[]> {
    return this.pemesananRepo.find({ relations: ['petani', 'buruh'] });
  }

  async findOne(id: number): Promise<Pemesanan> {
    const pemesanan = await this.pemesananRepo.findOne({
      where: { id },
      relations: ['petani', 'buruh'],
    });
  
    if (!pemesanan) {
      throw new Error('Pemesanan not found');
    }
  
    return pemesanan;
  }
  
}
