import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { UsuarioModule } from 'src/App/classes/Usuario/Usuario.Module';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from 'src/App/guards/JwtAuth.Guard';
import { AllGuards as AllAuthGuards } from 'src/App/index/indexAuthGuards';
import * as dotenv from 'dotenv';
import { admPermissionguard } from 'src/App/guards/admPermission.Guard';
import { UserIdguard } from 'src/App/guards/UserId.Guard';

dotenv.config();

@Module({
  imports: [
    PassportModule.register({defaultStrategy: "jwt"}),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(()=> UsuarioModule)
  ],
  providers: 
  [AuthService,
    JwtStrategy,
    admPermissionguard,
    JwtAuthGuard,
    ...AllAuthGuards
  ],
  controllers : [AuthController],
  exports: [
    AuthService, 
    JwtStrategy,
    JwtModule,
    ...AllAuthGuards
   ],
})
export class AuthModule {}
