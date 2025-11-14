import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UsuarioModule } from 'src/App/classes/Usuario/Usuario.Module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(()=> UsuarioModule)
  ],
  providers: [AuthService, JwtStrategy],
  controllers : [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
