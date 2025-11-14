import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    if (!value) return null;

    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(value)) {
      throw new BadRequestException(`Formato de data inválido: ${value}. Use yyyy-MM-dd`);
    }

    return value;
  }
}
