import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { AllModules } from './App/index/IndexModule';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    ...AllModules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
