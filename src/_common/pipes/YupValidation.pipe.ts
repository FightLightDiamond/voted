import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { BaseSchema } from 'yup';
import { serializeValidationError } from '../utils/serializeValidationError';

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private readonly schema: BaseSchema<object>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.validate(value, { abortEarly: false });
    } catch (err) {
      // throw err
      console.log(err);
      const yupError = serializeValidationError(err);
      console.log({ yupError });
      throw new BadRequestException(yupError);
    }
    return value;
  }
}
