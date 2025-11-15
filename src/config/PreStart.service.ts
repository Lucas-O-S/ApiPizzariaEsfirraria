import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from 'src/App/Model/Usuario.Model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PreStartService {
  constructor(
    @InjectModel(UsuarioModel) private usuarioModel: typeof UsuarioModel,
  ) {}

  async seed() {
    const admin = await this.usuarioModel.findOne({ where: { name: 'ADM' }});

    if (!admin) {
      await this.usuarioModel.create({
        name: "ADM",
        password: "123456",
        roleId: 1,
      });
    }
  }
}
