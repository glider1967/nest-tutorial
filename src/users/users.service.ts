import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new UserEntity();
    user.name = createUserDto.name;
    user.passwordHash = await this.generateHash(createUserDto.password);
    user.posts = [];

    await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: {
        name: true,
      },
    });
  }

  findOne(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByName(name: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ name });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private async generateHash(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
