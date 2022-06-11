import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export interface ICacheConfig {
  store: any;
  isGlobal: boolean;
  ttl: number; // seconds
  max: number; // maximum number of items in cache
  host: string;
  port: number;
}

export default class CacheConfig {
  static getConfig(configService: ConfigService) {
    return {
      store: redisStore,
      isGlobal: true,
      ttl: 5 * 60, // seconds
      max: 10000, // maximum number of items in cache
      host: configService.get<string>('REDIS_HOST'),
      port: parseInt(configService.get<string>('REDIS_PORT')),
    };
  }
}

export const CacheConfigAsync: any = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    CacheConfig.getConfig(configService),
};
