
export const UsuarioSchema = {
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Nome' },
        ra: { type: 'string', example: '12345' },
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
}
  