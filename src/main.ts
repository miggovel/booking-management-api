import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Security
    app.enableCors();
    app.use(helmet());

    // Set global prefix for API versioning
    app.setGlobalPrefix('api/v1');

    // Swagger Configuration
    const config = new DocumentBuilder()
        .setTitle('Booking Management API')
        .setDescription('The professional API for managing venues and bookings')
        .setVersion('1.0')
        .addBearerAuth() // Soporte para JWT en la documentación
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Use global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // Use global exception filter
    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
    console.log(`📄 Documentation available at: http://localhost:${port}/docs`);
}
bootstrap();
