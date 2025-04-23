import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BuruhService } from './buruh.service';
import { CreateBuruhDto } from './dto/crate_buruh.dto';

@Controller('buruh')
export class BuruhController {
  constructor(private readonly service: BuruhService) {}

  @Post()
  create(@Body() dto: CreateBuruhDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
