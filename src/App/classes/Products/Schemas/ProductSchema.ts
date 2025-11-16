export const ProductSchema = {
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Pizza de Calabresa' },
            description: { type: 'string', example: 'Deliciosa pizza com calabresa' },
            price: { type: 'number', example: 45.5 },
            productImage: {
                type: 'string',
                format: 'binary',
            },
        },
        required: ['name', 'description', 'priceTotal'],
    },
};
