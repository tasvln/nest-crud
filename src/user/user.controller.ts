import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditBookmarkDto } from 'src/bookmark/dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Put('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: EditBookmarkDto) {
    return this.editUser(userId, dto);
  }
}
