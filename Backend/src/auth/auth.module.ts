import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
    imports: [PassportModule.register({ session: true })],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
