import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import passport from 'passport';
import { AppModule } from './app.module';
import { RolesGuard } from './shared/guards/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(AppModule),
        config = app.get(ConfigService),
        reflector = app.get(Reflector),
        logger = new Logger('Main');

    app.enableCors({ credentials: true, origin: 'http://localhost:4200' });

    app.useGlobalPipes(new ValidationPipe({ transform: true }))
        .useGlobalGuards(new RolesGuard(reflector))
        .use(passport.initialize());

    await app.listen(config.get('PORT') || 3000, () =>
        logger.log(`listening on port: ${config.get('PORT')}`)
    );
}

bootstrap();
