import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Get('all')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Put('update/:id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto
  ) {
    return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete('delete')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
