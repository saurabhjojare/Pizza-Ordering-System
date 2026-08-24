import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(dto: CreateUserDto): Promise<void> {
    dto.password = await bcrypt.hash(dto.password, 10);
    await this.userRepository.save(dto);
  }

  getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ order: { created_at: 'DESC' } });
  }

  getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where: { user_id: id } });
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, dto);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}