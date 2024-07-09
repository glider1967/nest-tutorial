import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  authorName: string;

  @ApiProperty()
  content: string;
}
