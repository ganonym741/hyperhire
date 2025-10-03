import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { pagination } from 'prisma-extension-pagination';

const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(pagination());
};

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  customPrismaClient!: CustomPrismaClient;
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
        { emit: 'stdout', level: 'query' },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();

    this.$on('info', (e) => {
      this.logger.log(e);
    });
    this.$on('warn', (e) => {
      this.logger.warn(e);
    });
    this.$on('error', (e) => {
      this.logger.error(e);
    });

    // if (process.env.NODE_ENV == 'development') {
    //   this.$on('query', (e) => {
    //     this.logger.debug({
    //       params: e.params.replaceAll('"', "'"),
    //       query: e.query.replaceAll('"', "'"),
    //       tpe: typeof e.query,
    //     });
    //   });
    // }
  }

  get client() {
    if (!this.customPrismaClient) {
      //   const url = process.env.DATABASE_URL_REPLICA;
      this.customPrismaClient = customPrismaClient(this);
    }

    return this.customPrismaClient;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
