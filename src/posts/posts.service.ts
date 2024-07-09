import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = new PostEntity();
    post.author = await this.usersService.findOneByName(
      createPostDto.authorName,
    );
    post.content = createPostDto.content;
    post.createdAt = Date.now().toString();

    await this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOneBy({ id });
    post.content = updatePostDto.content;
    post.updatedAt = Date.now().toString();
    return this.postsRepository.save(post);
  }

  remove(id: number) {
    return this.postsRepository.delete({ id });
  }
}
