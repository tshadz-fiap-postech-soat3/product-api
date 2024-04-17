// import { ConfigService } from '@nestjs/config';

// const configService = new ConfigService();
// const config = {
//     dbHost: configService.get<string>('MYSQL_HOST') ?? 'fast-food-db',
//     dbName: configService.get<string>('MYSQL_DATABASE') ?? 'fastfood',
//     dbPassword: configService.get<string>('MYSQL_PASSWORD') ?? 'root',
//     dbPort: configService.get<string>('MYSQL_PORT') ?? 3300,
//     dbType: 'mysql',
//     dbUser: configService.get<string>('MYSQL_USER') ?? 'root',
//     cloudSqlInstanceName: configService.get<string>('CLOUD_SQL_INSTANCE'),
// };

// export const url = `mysql://${config.dbUser}:${config.dbPassword}@localhost/${config.dbName}?socket=/cloudsql/${config.cloudSqlInstanceName}`;

// process.env.DATABASE_URL = url;
