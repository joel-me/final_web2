import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find a user based on various conditions (email, username, etc.)
  async findOne(options: { where: any }): Promise<User | null> {
    return this.userRepository.findOne(options);  // Make sure the query is valid
  }

  // Find user by email (used in AuthService for sign-in)
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // Find user by email or username (used in AuthService for registration)
  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    // Updated query to fix TypeORM's FindOptionsWhere
    return this.userRepository.findOne({
      where: [
        { email },
        { username },
      ],
    });
  }

  // Create a new user entity with the provided data
  create(userData: Partial<User>): User {
    return this.userRepository.create(userData);
  }

  // Save the user to the database
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Optionally, you can add more methods for other user-related actions
}
