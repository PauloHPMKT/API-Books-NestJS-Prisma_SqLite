import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() data: CreateBookDto) {
    return this.booksService.create(data);
  }

  @Get()
  async findAllBooks() {
    return await this.booksService.findAllBooks();
  }

  @Patch(':id')
  async updateBook(@Param('id') id: string, @Body() data: CreateBookDto) {
    return await this.booksService.updateBook(id, data);
  }
}
