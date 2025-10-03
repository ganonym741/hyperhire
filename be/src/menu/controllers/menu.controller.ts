import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { GetAllMenuDto } from '../dtos/get-menu.dto';
import { CreateMenuDto } from '../dtos/create-menu.dto';
import { UpdateMenuDto } from '../dtos/update-menu.dto';
import { ApiOkResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { SwaggerMetaResponse } from '@core/types/standar-response.type';
import { MapResponseSwagger } from '@core/utils/helper';
import { Menu } from '@entities/menu';

@ApiTags('Menu Api')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('detail/:id')
  @MapResponseSwagger(OmitType(Menu, ['children', 'parent']), {
    isArray: false,
    status: 200,
  })
  async getMenuDetail(@Param('id') id: string) {
    try {
      const data = await this.menuService.getDetail(id);

      return { data: data };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new BadRequestException(`Data with id ${id} not found`);
      }

      throw new InternalServerErrorException(
        "Server can't process your request",
      );
    }
  }

  @Get()
  @MapResponseSwagger(Menu, { isArray: true, status: 200 })
  async getManyMenu(@Query() query: GetAllMenuDto) {
    try {
      const data = await this.menuService.findAll(query);

      return { data: data };
    } catch (error) {
      throw new InternalServerErrorException(
        "Server can't process your request",
      );
    }
  }

  @Post()
  @ApiOkResponse({
    type: SwaggerMetaResponse,
  })
  async createMenu(@Body() menuData: CreateMenuDto) {
    try {
      const data = await this.menuService.create(menuData);

      return {
        status_description: 'Menu created',
        data: data,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        "Server can't process your request",
      );
    }
  }

  @Put(':id')
  @ApiOkResponse({
    type: SwaggerMetaResponse,
  })
  updateMenu(@Param('id') id: string, @Body() menuData: UpdateMenuDto) {
    try {
      this.menuService.update(id, menuData);

      return {
        status_description: `Data successfuly updated`,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new BadRequestException('Record to update does not exist');
      }

      throw new InternalServerErrorException(
        "Server can't process your request",
      );
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    type: SwaggerMetaResponse,
  })
  deleteMenu(@Param('id') id: string) {
    try {
      this.menuService.delete(id);

      return {
        status_description: `Data successfuly deleted`,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new BadRequestException('Record to delete does not exist');
      }

      throw new InternalServerErrorException(
        "Server can't process your request",
      );
    }
  }
}
