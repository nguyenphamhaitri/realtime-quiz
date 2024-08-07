// src/decorators/auth.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret'; // Replace with an environment variable

export function Auth(): MethodDecorator {
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

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).send('access denied');
      }

      const [bearer, token] = authHeader.split(' ');
      if (bearer.toLowerCase() !== 'bearer' || !token) {
        return res.status(401).send('access denied');
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return originalMethod.apply(this, args);
      } catch (error) {
        res.status(403).send('Invalid or expired token');
      }
    };
  };
}
