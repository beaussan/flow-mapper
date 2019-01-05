import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LocalAuthInterface {
  @ApiModelProperty({ example: 'toto@toto.fr' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({ minLength: 3 })
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiModelProperty({ example: 'Charles Xavier' })
  @IsNotEmpty()
  name: string;
}
