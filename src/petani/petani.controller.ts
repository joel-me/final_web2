import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PetaniService } from './petani.service';

@Controller('petani')
export class PetaniController {
  constructor(private readonly service: PetaniService) {}

  @Post()
  create(@Body() body: { userId: number, lokasi: string }) {
    return this.service.createPetani(body.userId, body.lokasi);
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number) {
    return this.service.findByUserId(userId);
  }
}
