import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminController } from './admin/admin.controller';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { logger } from './middleware/logger/logger.middleware';
import { ModuleEventsService } from './lifecycle/module.events.service';
import { AppEventsService } from './lifecycle/app.events.service';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController, CatsController, AdminController],
  providers: [AppService, CatsService, AppEventsService, ModuleEventsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('cats');
    //apply the middleware to the desired request method type
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });

    //apply the middle ware to the controller and excude post method
    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'cats', method: RequestMethod.POST })
    //   .forRoutes(CatsController);
  }
}
