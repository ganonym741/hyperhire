import type { Type } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

import { SwaggerMetaResponse, Meta } from '../types/standar-response.type';

export const MapResponseSwagger = <
  DataDto extends Type<unknown>,
  Options extends { status: number; isArray: boolean },
>(
  dataDto: DataDto,
  options: Options,
) =>
  applyDecorators(
    ApiExtraModels(SwaggerMetaResponse, Meta, dataDto),
    ApiResponse({
      status: options.status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(SwaggerMetaResponse) },
          {
            ...(options.isArray
              ? {
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: getSchemaPath(dataDto) },
                    },

                    meta: {
                      $ref: getSchemaPath('Meta'),
                    },
                  },
                }
              : {
                  properties: {
                    data: {
                      $ref: getSchemaPath(dataDto),
                    },
                  },
                }),
          },
        ],
      },
    }),
  );
