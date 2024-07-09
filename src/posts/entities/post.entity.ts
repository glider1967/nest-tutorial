import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  author: UserEntity;

  @Column()
  content: string;

  @Column('datetime')
  createdAt: string;

  @Column('datetime')
  updatedAt: string;
}
