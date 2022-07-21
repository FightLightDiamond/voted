import { ConfigModule, ConfigService } from '@nestjs/config';

export const ThrottlerConfig: any = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    ttl: config.get('THROTTLE_TTL', 1),
    limit: config.get('THROTTLE_LIMIT', 100),
  }),
};
