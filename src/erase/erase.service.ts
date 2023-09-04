import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { EraseDto } from './dto/erase.dto';
import { EraseRepository } from './erase.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EraseService {
  constructor(private readonly eraseRepository: EraseRepository) {}

  async remove(body: EraseDto) {
    const { userId, password } = body;
    const user = await this.eraseRepository.findUserById(userId);
    const passwordHashed = bcrypt.compare(password, user.password);
    if (!passwordHashed) throw new UnauthorizedException();
    await this.eraseRepository.deleteCard(userId);
    await this.eraseRepository.deleteCredentials(userId);
    await this.eraseRepository.deleteNotes(userId);
    await this.eraseRepository.deleteUser(userId);
    return HttpStatus.OK;
  }
}
