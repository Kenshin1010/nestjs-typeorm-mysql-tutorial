import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUser() {
    return this.userService.findUsers();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const { confirmPassword, ...userDetails } = createUserDto;
    return this.userService.createUser(userDetails);
  }

  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(id, createUserPostDto);
  }
}
