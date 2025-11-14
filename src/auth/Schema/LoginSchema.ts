
export const LoginSchema = {
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Nome' },
        password: { type: 'string', example: '12345' },
      }
    },
}
  