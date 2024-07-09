import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from 'src/posts/entities/post.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Index({ unique: true })
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  passwordHash: string;

  @ApiProperty()
  @OneToMany(() => PostEntity, (post) => post.author)
  posts: PostEntity[];
}
