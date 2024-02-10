import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { error } from 'console';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.UserService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const userFound = await this.UserService.getUserById(Number(id));
    if (!userFound) throw new NotFoundException('User not Found');
    return userFound;
  }

  @Post()
  async createUser(@Body() data: User) {
    try {
      return await this.UserService.createUser(data);
    } catch (error) {
      if (error.code === 'P2002')
        throw new BadRequestException('email already exists');
    }
    throw error;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      return await this.UserService.deleteUser(Number(id));
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() data: User) {
    try {
      return await this.UserService.updateUser(Number(id), data);
    } catch (error) {
      throw new NotFoundException('User does not exist');
    }
  }
}
