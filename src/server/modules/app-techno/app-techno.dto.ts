import { IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class AppTechnoDto {
  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  @Type(() => String)
  name: string;
}
