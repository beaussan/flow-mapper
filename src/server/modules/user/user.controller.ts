import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Roles } from '../../decorators/roles.decorator';
import { ROLES } from './role.constants';
import { User } from './user.entity';
import { UserService } from './user.service';
import { IsSuperUser } from '../../decorators/isSuperUser.decorator';
import { CurrentUser } from '../../decorators/currentUser.decorator';
import { RegisterFromAdminUserDto, UserRoleDto } from './user.dto';

@ApiUseTags('User management')
@Controller()
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users with their permissions',
    type: User,
    isArray: true,
  })
  @IsSuperUser()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post()
  @IsSuperUser()
  registerNewUser(@Body() register: RegisterFromAdminUserDto): Promise<User> {
    return this.userService.registerOneWithAdmin(register);
  }

  @Post(':id/promote')
  @IsSuperUser()
  promoteUser(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.promoteUser(id);
  }

  @Post(':id/demote')
  @IsSuperUser()
  demoteUser(
    @Param('id', new ParseIntPipe()) id: number,
    @CurrentUser() currentUser,
  ): Promise<User> {
    if (currentUser.id === id) {
      throw new BadRequestException('You cannot demote yourself');
    }
    return this.userService.demoteUser(id);
  }

  @Post(':id/roles')
  @IsSuperUser()
  changeRoles(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() roles: UserRoleDto,
  ): Promise<User> {
    return this.userService.updateRoles(id, roles.roles);
  }
}
