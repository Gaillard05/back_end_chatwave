import { Injectable, NotFoundException } from '@nestjs/common';
import { Cats } from './cats.entity';

@Injectable()
export class CatsService {
  private readonly cats: Cats[] = [
    { id: 1, name: 'Whiskers', age: 2, breed: 'Persian' },
    { id: 2, name: 'Tom', age: 4, breed: 'Siamese' },
  ];

  findAll(): Cats[] {
    return this.cats;
  }

  findOneById(id: number): Cats {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with id ${id} not found`);
    }
    return cat;
  }

  create(cat: Cats): Cats {
    this.cats.push(cat);
    return cat;
  }
}
