import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as config from 'config';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST') || dbConfig.host,
        port: configService.get<number>('POSTGRES_PORT') || dbConfig.port,
        username:
          configService.get<string>('POSTGRES_USER') || dbConfig.username,
        password:
          configService.get<string>('POSTGRES_PASSWORD') || dbConfig.password,
        database: configService.get<string>('POSTGRES_DB') || dbConfig.database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: dbConfig.synchronize,
      }),
    }),
  ],
})
export class DatabaseModule {}
