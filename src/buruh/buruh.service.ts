import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buruh } from './buruh.entity';
import { CreateBuruhDto } from './dto/crate_buruh.dto';
import { User } from '../user/user.entity';

@Injectable()
export class BuruhService {
  constructor(
    @InjectRepository(Buruh)
    private readonly buruhRepo: Repository<Buruh>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateBuruhDto): Promise<Buruh> {
    const user = await this.userRepo.findOneBy({ id: dto.userId });
    if (!user) throw new Error('User not found');

    const buruh = this.buruhRepo.create({
      user,
      lokasi: dto.lokasi,
      keahlian: dto.keahlian,
    });

    return this.buruhRepo.save(buruh);
  }

  async findAll(): Promise<Buruh[]> {
    return this.buruhRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Buruh> {
    const buruh = await this.buruhRepo.findOne({
      where: { id },
      relations: ['user'],  // Menyesuaikan dengan relasi yang ada di entity
    });
  
    if (!buruh) {
      throw new Error('Buruh not found');
    }
  
    return buruh;
  }
  
}
