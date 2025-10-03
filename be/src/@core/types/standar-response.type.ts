import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class Meta {
  @ApiProperty({ example: 10 })
  page_size: number;

  @ApiProperty({ example: 1 })
  current_page: number;

  @ApiProperty({ example: 1000 })
  total: number;

  @ApiProperty({ example: 100 })
  total_page: number;
}

export class MetaReq {
  @ApiProperty({ example: 10, nullable: true, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page_size?: number;

  @ApiProperty({ example: 1, nullable: true, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}

export class SwaggerMetaResponse {
  @ApiProperty({ example: 'Inquiry berhasil' })
  status_description: string;
}

export interface DataOnlyRes<T> {
  data: T;
}

export interface DataWithStatusRes<T>
  extends DataOnlyRes<T>,
    SwaggerMetaResponse {}

export interface DataWithMetaRes<T> extends DataOnlyRes<T> {
  meta: Meta;
}

export interface StatusDataMetaRes<T>
  extends DataWithMetaRes<T>,
    DataWithStatusRes<T> {}

export interface UserTokenRaw {
  id?: string;
  iat?: number;
  exp?: number;
}

export interface UserSession {
  id?: string;
  login_at?: Date;
  iat?: number;
}
