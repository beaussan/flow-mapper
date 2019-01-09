import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { FlowTechnoOrder } from './flow-techno-order.entity';
import { FlowApp } from '../flow-app/flow-app.entity';
import { FlowTechno } from '../flow-techno/flow-techno.entity';

export class FlowDtoInput {
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
  @IsNumber()
  sourceAppId: number;

  @ApiModelProperty({ required: true })
  @IsNumber()
  destinationAppId: number;

  @ApiModelProperty({ required: true })
  @IsArray()
  flowTechnos: string[];
}

export class FLowDtoOutput {
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
  sourceApp: FlowApp;

  @ApiModelProperty({ required: true })
  destinationApp: FlowApp;

  @ApiModelProperty({ required: true })
  @IsArray()
  flowTechnos: FlowTechno[];
}
