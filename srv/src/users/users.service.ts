import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
  ) {}

  // get list of all users

  async getAllUsers(options: {
    take: number;
    skip: number;
  }): Promise<{ users: UsersEntity[]; totalPages: number; currentPage: number; firstPage: number; lastPage: number }> {
    const { take, skip } = options;
    const queryBuilder = this.usersRepo.createQueryBuilder('user');

    const [users, count] = await queryBuilder.select().take(take).skip(skip).getManyAndCount();
    const totalPages = Math.ceil(count / take);
    const currentPage = Math.ceil((skip + 1) / take);
    const firstPage = 1;
    const lastPage = totalPages;

    return { users, totalPages, currentPage, firstPage, lastPage };
  }
}
