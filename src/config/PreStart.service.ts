import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from 'src/App/Model/Usuario.Model';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/App/classes/Usuario/Usuario.Service';

@Injectable()
export class PreStartService {
  constructor(
    private readonly usuarioService : UsuarioService,
  ) {}

  async createAdm() {
    await this.usuarioService.verifyFirstAdmExistence()
  }
}
