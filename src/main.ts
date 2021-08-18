import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //bind middleware to every registered route at once
  // app.use(logger);

  await app.listen(3000);
}
bootstrap();
