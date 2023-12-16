import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, { metatype }: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    console.log('metatype0-----', metatype);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
