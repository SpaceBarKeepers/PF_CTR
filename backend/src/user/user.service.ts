import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

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

  // async findOne(username: string): Promise<User | null> {
  //   return this.userModel.findOne({username}).exec();
  // }
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userModel.find().exec();
  // }
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // delete(username: string) {
  //   return this.userModel.findOneAndDelete({username}).exec();
  // }
  delete(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }

  // async asignActiveDevice(username: string, deviceId: string): Promise<User | null> {
  //   return this.userModel.findOneAndUpdate({username}, {activeDevice: deviceId}).exec();
  // }

  async assignActiveDevice(id: number, deviceId: string): Promise<UpdateResult> {
    return this.userRepository.update(id, { activeDevice: deviceId });
  }
}
