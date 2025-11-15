import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreStartService } from './PreStart.service';
import { UsuarioModel } from 'src/App/Model/Usuario.Model';

@Module({
  imports: [SequelizeModule.forFeature([UsuarioModel])],
  providers: [PreStartService],
})
export class PreStartModule implements OnApplicationBootstrap {
  constructor(private seedService: PreStartService) {}

  async onApplicationBootstrap() {
    await this.seedService.seed();
  }
}
