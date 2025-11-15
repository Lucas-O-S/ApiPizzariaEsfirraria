import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UsuarioModule } from 'src/App/classes/Usuario/Usuario.Module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from 'src/App/guards/jwtAuthGuard';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: process.env.secret || 'default-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(()=> UsuarioModule)
  ],
  providers: [AuthService, JwtStrategy,JwtAuthGuard],
  controllers : [AuthController],
  exports: [AuthService, JwtStrategy,JwtAuthGuard],
})
export class AuthModule {}
