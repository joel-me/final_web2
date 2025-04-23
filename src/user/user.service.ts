import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const { password } = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  }
  

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
