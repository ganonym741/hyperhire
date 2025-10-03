import { PrismaService } from '@core/services/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '../dtos/create-menu.dto';
import { UpdateMenuDto } from '../dtos/update-menu.dto';
import { GetAllMenuDto } from '../dtos/get-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(menuData: CreateMenuDto) {
    const result = await this.prisma.menu.create({
      data: menuData,
    });
    return result;
  }

  async update(id: string, menuData: UpdateMenuDto) {
    const result = await this.prisma.menu.update({
      where: { id },
      data: menuData,
    });
    return result;
  }

  async getDetail(id: string) {
    const result = await this.prisma.menu.findUnique({
      where: { id },
    });
    return result;
  }

  async findAll(filter: GetAllMenuDto) {
    const result = await this.prisma.menu.findMany({
      where: {
        depth: 0,
        isActive: filter.isActive,
      },
      orderBy: {
        name: 'asc',
      },
      include: this.buildRecursiveInclude({
        ...filter,
        depth: filter.depth - 1,
      }),
    });

    return result;
  }

  async delete(id: string) {
    const result = await this.prisma.menu.delete({
      where: { id },
    });
    return result;
  }

  private buildRecursiveInclude(filter: GetAllMenuDto) {
    if (filter.depth <= 0) {
      return undefined;
    }

    return {
      children: {
        where: {
          isActive: filter.isActive,
        },
        orderBy: {
          name: 'asc'
        },
        include: this.buildRecursiveInclude({
          ...filter,
          depth: filter.depth - 1,
        }),
      },
    };
  }
}
