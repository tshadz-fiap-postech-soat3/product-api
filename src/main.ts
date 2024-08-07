import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './external/driven/infra/database/prisma.service';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);

  app.enableCors({
    origin: ['http://your-allowed-origin.com'], // Substitua pelo domínio que você deseja permitir
    credentials: true, // Habilitar o suporte a credenciais
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Accept', // Cabeçalhos permitidos
  });
  // Configurar helmet para adicionar cabeçalhos de segurança
  app.use(helmet());

  // Configurar CSP usando helmet
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://trusted-cdn.com'],
        styleSrc: ["'self'", 'https://trusted-cdn.com'],
        imgSrc: ["'self'", 'https://images.example.com'],
        connectSrc: ["'self'", 'https://api.example.com'],
        fontSrc: ["'self'", 'https://fonts.example.com'],
        objectSrc: ["'none'"],
        frameSrc: ["'none'"],
        upgradeInsecureRequests: [], // Para forçar a HTTPS
      },
    }),
  );

  // Adicionar o cabeçalho Permissions-Policy manualmente
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader(
      'Permissions-Policy',
      'fullscreen=(self), geolocation=(), microphone=(), camera=()',
    );
    next();
  });

  const config = new DocumentBuilder()
    .setTitle('Fast Food')
    .setDescription('Api to handle a fastfood service')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
