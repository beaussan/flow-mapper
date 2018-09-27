import { IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class FlowAppDto {
  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiModelProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  description: string;
}
