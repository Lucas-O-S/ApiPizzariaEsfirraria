import { forwardRef, Module, OnApplicationBootstrap } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PreStartService } from './PreStart.service';
import { UsuarioModel } from 'src/App/Model/Usuario.Model';
import { UsuarioModule } from 'src/App/classes/Usuario/Usuario.Module';

@Module({
  imports: [
    forwardRef(()=> UsuarioModule)
  ],
  providers: [PreStartService],
})
export class PreStartModule implements OnApplicationBootstrap {
  constructor(private seedService: PreStartService) {}

  async onApplicationBootstrap() {
    await this.seedService.createAdm();
  }
}
