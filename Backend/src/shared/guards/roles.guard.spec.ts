import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('LocalAuthGuard', () => {
    //TODO: think about if this is the best way to pass Reflector dependency to the tested guard
    it('should be defined', () => {
        expect(new RolesGuard(new Reflector())).toBeDefined();
    });
});
