import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  create(post: Partial<Post>): Promise<Post> {
    const newPost = this.postRepository.create(post);
    return this.postRepository.save(newPost);
  }

  async update(id: number, post: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, post);
    return this.findOne(id);
  }

  remove(id: number): Promise<void> {
    return this.postRepository.delete(id).then(() => undefined);
  }
}
