import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, CreateUserFromPaygateDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { generatePassword } from '../utils/generatePassword';
import { generateBcryptHash } from '../utils/generateBcryptHash';

@Injectable()
export class UserService {
  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // create(user: User) {
  //   const createdUser = new this.userModel(user);
  //   return createdUser.save();
  // }
  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  delete(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }

  async assignActiveDevice(
    id: number,
    deviceId: string,
  ): Promise<UpdateResult> {
    return this.userRepository.update(id, { activeDevice: deviceId });
  }

  async checkIfUserExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username });
    return !!user;
  }
}
