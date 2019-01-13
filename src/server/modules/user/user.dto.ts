import { IsArray, IsBoolean, IsEmail, IsIn, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { ROLES } from './role.constants';

export class UserRoleDto {
  @ApiModelProperty({
    required: true,
    example: [ROLES.ROLE_EDIT_APPS, ROLES.ROLE_EDIT_FLOW, ROLES.ROLE_USER],
  })
  @IsArray()
  @IsIn([ROLES.ROLE_EDIT_APPS, ROLES.ROLE_EDIT_FLOW, ROLES.ROLE_USER], {
    each: true,
  })
  roles: string[];
}

export class RegisterFromAdminUserDto {
  @ApiModelProperty({
    required: true,
    example: [ROLES.ROLE_EDIT_APPS, ROLES.ROLE_EDIT_FLOW, ROLES.ROLE_USER],
  })
  @IsArray()
  @IsIn([ROLES.ROLE_EDIT_APPS, ROLES.ROLE_EDIT_FLOW, ROLES.ROLE_USER], {
    each: true,
  })
  roles: string[];

  @ApiModelProperty({ required: true, example: 'toto.tata@toto.fr' })
  @IsEmail()
  email: string;

  @ApiModelProperty({ required: true, example: 'Mr Toto' })
  @MinLength(1)
  name: string;

  @ApiModelProperty({ required: true, example: 'some password' })
  @MinLength(1)
  password: string;

  @ApiModelProperty({ required: true, example: false })
  @IsBoolean()
  isSuperUser: boolean;
}
