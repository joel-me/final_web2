import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Petani } from './petani.entity';

@Injectable()
export class PetaniService {
  constructor(
    @InjectRepository(Petani)
    private readonly petaniRepo: Repository<Petani>,
  ) {}

  async createPetani(userId: number, lokasi: string): Promise<Petani> {
    const petani = this.petaniRepo.create({ user: { id: userId }, lokasi });
    return this.petaniRepo.save(petani);
  }

  // Memperbaiki bagian ini
  async findByUserId(userId: number): Promise<Petani | null> {
    const petani = await this.petaniRepo.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    
    if (!petani) {
      throw new Error(`Petani with userId ${userId} not found`);
    }

    return petani;
  }
}
