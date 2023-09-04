import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) {}

  async create(createCredentialDto: CreateCredentialDto) {
    const { title } = createCredentialDto;
    const findUserCredentials =
      await this.credentialsRepository.findUserCredentialsByTitle(title);
    if (findUserCredentials)
      throw new HttpException(
        'Cannot create a credential becuse this title alredy exist',
        HttpStatus.CONFLICT,
      );
    return this.credentialsRepository.createCredentials(createCredentialDto);
  }
  async findCredentials(id: number, userId: number) {
    const credential = await this.credentialsRepository.findCredentialById(id);
    if (credential.userId !== userId)
      throw new HttpException(
        'This credential belongs to another user',
        HttpStatus.FORBIDDEN,
      );
    if (!credential) throw new NotFoundException('credential not found!');
    if (!id) {
      const allCredentials =
        await this.credentialsRepository.findCredentials(userId);
      const array = allCredentials.map((credential) => {
        delete credential.hashedPassword;
        return credential;
      });
      return array;
    }
    const unhashedCredential = { ...credential };
    delete unhashedCredential.hashedPassword;
    return unhashedCredential;
  }
  async remove(id: number, userId: number) {
    const user = await this.credentialsRepository.findCredentialById(id);
    if (!user) throw new NotFoundException();
    if (user.userId !== userId)
      throw new HttpException(
        'This credential belongs to another user',
        HttpStatus.FORBIDDEN,
      );
    return this.credentialsRepository.deleteCredential(id);
  }
}
