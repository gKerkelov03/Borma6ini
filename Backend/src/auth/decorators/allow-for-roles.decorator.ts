import { SetMetadata } from '@nestjs/common';
import { Role } from '../../shared/enums';

export const AllowForRoles = (...roles: Role[]) =>
    SetMetadata('roles', [Role.Admin, ...roles]);
