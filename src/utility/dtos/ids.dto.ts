import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdsDto {
  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.split(',').map(Number))
  ids?: number[];
}
