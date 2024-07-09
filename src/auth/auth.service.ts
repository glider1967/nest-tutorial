import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';

interface JwtPayload {
  userid: UserEntity['id'];
  username: UserEntity['name'];
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<{ token: string }> {
    const user = await this.usersService.findOneByName(username);
    const isMatch = await compare(pass, user?.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = { userid: user.id, username: user.name };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
