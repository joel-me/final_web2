import { Controller, Get, Param, Put, Body, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto'; // You need to create this DTO for user update

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user details by ID
  @Get(':id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  // Update user details
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDTO: CreateUserDto) {
    const user = await this.userService.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Update fields in user
    user.username = updateUserDTO.username ?? user.username;
    user.email = updateUserDTO.email ?? user.email;
    user.role = updateUserDTO.role ?? user.role;

    await this.userService.save(user);
    return { message: 'User updated successfully' };
  }

}
