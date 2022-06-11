import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Res,
  Param,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Observable, of, switchMap } from 'rxjs';
import { SETTING } from '../app.utils';
import { JwtGuard } from '../auth/guards/jwt.guard';
import {
  isFileExtensionSafe,
  removeFile,
  saveImageToStorage,
} from '../_common/helpers/image-storage';
import { UserService } from './user.service';
import { RegisterReqDto } from './dto/register.req.dto';
import { UserEntity } from './user.entity';

const path = require('path');

@Controller('user')
/**
 * User Controller
 */
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Do User Registration
   * @param registerBody
   */
  @Post('/register')
  @UsePipes(ValidationPipe)
  async doUserRegistration(
    @Body(SETTING.VALIDATION_PIPE)
    registerBody: RegisterReqDto,
  ): Promise<UserEntity> {
    return this.userService.doUserRegistration(registerBody);
  }

  /**
   * Update Image
   * @param file
   * @param req
   */
  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  updateImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Observable<UpdateResult | { error: string }> {
    const fileName = file.filename;
    if (!fileName) return of({ error: 'File must be a png, jpg/jpeg' });

    const imagesFolderPath = path.join(process.cwd(), 'images');
    const fullImagePath = path.join(imagesFolderPath + '/' + file.filename);

    if (isFileExtensionSafe(fullImagePath)) {
      const userId = req.user.id;
      return this.userService.updateUserImageById(userId, fileName);
    }
    removeFile(fullImagePath);
    return of({ error: 'File content does not match extension!' });
  }

  /**
   * Find Image
   * @param req
   * @param res
   */
  @UseGuards(JwtGuard)
  @Get('images')
  findImage(@Request() req, @Res() res): Observable<string> {
    const userId = req.user.id;
    return this.userService.findImageNameByUserid(userId).pipe(
      switchMap((imageName: string) => {
        return of(res.sendFile(imageName, { root: './images' }));
      }),
    );
  }

  @Get('/confirm/:id')
  async confirmEmail(@Param('id') id: string) {
    return this.userService.confirmEmail(id);
    // return `This action return a #${id} cat`
  }

  @Post('avatar')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request, @UploadedFile() file: Express.Multer.File) {
    console.log(file.originalname);
    return this.userService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Post('files')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.addPrivateFile(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  @UseGuards(JwtGuard)
  async getPrivateFile(@Req() request, @Param() { id }, @Res() res) {
    const file = await this.userService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(res);
  }

  @Get('files')
  @UseGuards(JwtGuard)
  async getAllPrivateFiles(@Req() request) {
    return this.userService.getAllPrivateFiles(request.user.id);
  }
}
