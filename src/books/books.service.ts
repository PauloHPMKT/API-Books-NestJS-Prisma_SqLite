import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private primaModel: PrismaService) {}

  async create(data: CreateBookDto) {
    const bookExists = await this.primaModel.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExists) throw new Error('Esse livro já existe');

    const newBook = await this.primaModel.book.create({
      data,
    });

    return newBook;
  }

  async findAllBooks() {
    return this.primaModel.book.findMany();
  }

  async updateBook(id: string, data: CreateBookDto) {
    const bookExists = await this.primaModel.book.findUnique({
      where: {
        id,
      },
    });

    if (!bookExists) throw new Error('Livro inexistente');

    return await this.primaModel.book.update({
      data,
      where: {
        id,
      },
    });
  }
}
