import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ResponseMiddleware } from '@core/common/middleware/response.middleware';
import { MenuModule } from './menu/menu.module';
import { PrismaService } from '@core/services/prisma/prisma.service';
import { PrismaModule } from '@core/services/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MenuModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }}
