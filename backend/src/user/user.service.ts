import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { EmailService } from '../email/email.service';
import { generatePassword } from '../utils/generatePassword';
import { generateBcryptHash } from '../utils/generateBcryptHash';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    const password = generatePassword(16);
    const hashedPassword = await generateBcryptHash(password);

    user.username = createUserDto.username;
    user.password = hashedPassword!;
    user.name = createUserDto.name;
    user.organization = createUserDto.organization;
    user.phone = createUserDto.phone;
    user.address = createUserDto.address;
    user.shippingCode = createUserDto.shippingCode;
    user.registered = new Date();
    user.lastLogin = new Date();

    try {
      await this.emailService.sendPasswordEmail(
        createUserDto.username,
        password,
      );
    } catch (error) {
      console.error('Error while sending email:', error);
    }

    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  delete(id: number): Promise<{ affected?: number | null }> {
    return this.userRepository.delete(id);
  }

  async assignActiveDevice(
    username: string,
    deviceId: string,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ username }, { activeDevice: deviceId });
  }

  async checkIfUserExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ username });
    return !!user;
  }

  async changePassword(username: string, newPassword: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await generateBcryptHash(newPassword);
    return this.userRepository.update(
      { username },
      { password: hashedPassword },
    );
  }

  async resetPassword(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const password = generatePassword(16);
    const hashedPassword = await generateBcryptHash(password);

    try {
      await this.emailService.sendResetPasswordEmail(username, password);
    } catch (error) {
      console.error('Error while sending email:', error);
    }

    return this.userRepository.update(
      { username },
      { password: hashedPassword },
    );
  }
}
