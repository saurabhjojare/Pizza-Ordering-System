import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async validateUser(email: string, password: string): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userRepository.findOneBy({ email_address: email });
    if (!user || !(await bcrypt.compare(password, user.password))) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  login(user: Omit<UserEntity, 'password'>): { access_token: string } {
    return {
      access_token: this.jwtService.sign({
        sub: user.user_id, email_address: user.email_address, role: user.role
      }),
    };
  }
}