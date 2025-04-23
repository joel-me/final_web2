import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-playload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // SignIn method with async bcrypt compare
  async signIn(email: string, password: string) {
    const user: User | null = await this.userService.findByEmail(email);
    if (!user || email !== user.email) {
      throw new UnauthorizedException();
    }

    // Use async bcrypt compare for password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayloadDto = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  // Register method
  async register(registerDto: RegisterDTO) {
    // Check if user already exists by email or username
    const existedUser: User | null = await this.userService.findByEmailOrUsername(
      registerDto.email,
      registerDto.username,
    );
    if (existedUser) {
      throw new HttpException(
        'Email or username already exists',
        HttpStatus.CONFLICT,
      );
    }

    // Create new user
    const user: User = new User();
    user.email = registerDto.email;
    user.username = registerDto.username;
    user.password = registerDto.password; // plain text password

    // Hash password before saving (password_hash field)
    user.password = await bcrypt.hash(user.password, 10);

    // Save user
    await this.userService.save(user);
  }
}
