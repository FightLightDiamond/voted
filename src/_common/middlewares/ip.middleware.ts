import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getClientIp } from 'request-ip';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ip = getClientIp(req);
    console.log({ ip });
    // RequestContext.setIp(ip);
    // Object.defineProperty(req, 'clientIp', {
    //   get: () => ip,
    //   configurable: true,
    // });
    next();
  }
}
