import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto
      }
    });

    return bookmark;
  }

  async getBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId
      }
    });
    return bookmarks;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId
      }
    });
    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto
  ) {
    const findBookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    });

    if (!findBookmark || findBookmark.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const bookmark = await this.prisma.bookmark.update({
      where: {
        id: bookmarkId
      },
      data: {
        ...dto
      }
    });

    return bookmark;
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const findBookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId
      }
    });

    if (!findBookmark || findBookmark.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const bookmark = await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId
      }
    });

    return bookmark;
  }
}
