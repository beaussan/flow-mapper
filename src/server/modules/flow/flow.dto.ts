import { IsArray, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { FlowTechnoOrder } from './flow-techno-order.entity';
import { FlowApp } from '../flow-app/flow-app.entity';

export class FlowDto {
  @ApiModelProperty({ required: true })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiModelProperty({ required: false })
  @IsString()
  @MinLength(1)
  @IsOptional()
  description: string;

  @ApiModelProperty({ required: true })
  @IsArray()
  sourceApp: FlowApp;

  @ApiModelProperty({ required: true })
  @IsArray()
  destinationApp: FlowApp;

  @ApiModelProperty({ required: true })
  @IsArray()
  flowTechnos: FlowTechnoOrder[];
}
