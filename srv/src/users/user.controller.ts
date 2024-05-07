import { UserService } from './users.service';
import { Controller, Get, Logger, Query } from '@nestjs/common';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Query('page') page: number = 1, @Query('perPage') perPage: number = 20) {
    return this.userService.getAllUsers({
      take: perPage,
      skip: (page - 1) * perPage,
    });
  }
}
