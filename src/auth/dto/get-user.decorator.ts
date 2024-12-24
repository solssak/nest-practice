import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    // custom decorator 를 사용해 정돈된(?) request 객체에 접근
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
