import { Controller, Get, Post as HttpPost, Param, Body, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @HttpPost()
  create(@Body() post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
