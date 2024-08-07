// src/decorators/roles.ts
import { RequestHandler } from 'express';

export function Roles(...roles: string[]): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const req = args[0] as any; // The request object
      const res = args[1] as any; // The response object
      const next = args[2] as any; // The next function

      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).send('access denied.');
      }

      return originalMethod.apply(this, args);
    };
  };
}
