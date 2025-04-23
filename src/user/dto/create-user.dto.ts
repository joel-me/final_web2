import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/auth/dto/register.dto';

// src/user/dto/create-user.dto.ts
export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: UserRole;
}
