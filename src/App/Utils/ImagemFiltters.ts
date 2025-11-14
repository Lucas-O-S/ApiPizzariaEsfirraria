import { BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export const ImageInterceptorRules = FileInterceptor('imagem', {
    limits: {
      fileSize: 2 * 1024 * 1024 // 2 MB
    },
    fileFilter: (req, file, callback) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.mimetype)) {
        return callback(new BadRequestException('Formato de imagem inválido. Use JPG, PNG ou WEBP.'), false);
      }
      callback(null, true);
    }
  });