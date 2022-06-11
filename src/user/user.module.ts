import { CacheModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConfigAsync } from '../config/jwt.config';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { ConfirmEmailService } from './email/confirmEmail.service';
import { AddressRepository } from './address/address.repository';
import { AddressService } from './address/address.service';
import { AddressController } from './address/address.controller';
import { FilesService } from './files/files.service';
import { PublicFileRepository } from './files/PublicFile.repository';
import { PrivateFileRepository } from './files/PrivateFile.repository';
import { PrivateFilesService } from './files/privateFiles.service';
import { AicdController } from './aicd/aicd.controller';

@Global()
@Module({
  imports: [
    ConfigService,
    CacheModule.register(),
    TypeOrmModule.forFeature([
      UserRepository,
      AddressRepository,
      PublicFileRepository,
      PrivateFileRepository,
    ]),
    JwtModule.registerAsync(jwtConfigAsync),
  ],
  controllers: [UserController, AddressController, AicdController],
  providers: [
    UserService,
    AddressService,
    UserResolver,
    ConfirmEmailService,
    FilesService,
    PrivateFilesService,
  ],
  exports: [UserService, AddressService, ConfigService],
})
export class UserModule {}
