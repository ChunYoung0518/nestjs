import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './users/exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //bind middleware to every registered route at once
  // app.use(logger);

  //set up the exception filter for every rounte handler
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
