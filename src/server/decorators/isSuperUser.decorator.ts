import { ReflectMetadata } from '@nestjs/common';

export const IsSuperUser = () => ReflectMetadata('isSuperUser', true);
