import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class Menu {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  nameKr?: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  depth: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({ type: () => Menu })
  parent?: Menu;

  @ApiProperty({ isArray: true, type: () => Menu })
  children: Menu[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
