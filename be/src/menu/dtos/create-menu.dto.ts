import { Menu } from '@entities/menu';
import { OmitType } from '@nestjs/swagger';

export class CreateMenuDto extends OmitType(Menu, [
  'id',
  'createdAt',
  'updatedAt',
  'parent',
  'children'
]) {}
