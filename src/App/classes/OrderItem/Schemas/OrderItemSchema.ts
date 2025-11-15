export const OrderItemSchema = {
    schema: {
        type: 'object',
        properties: {
            productId: { type: 'number', example: 3 },
            quantity: { type: 'number', example: 2 },
            priceTotal: { type: 'number', example: 50.0 },
        },
        required: ['productId', 'quantity', 'priceTotal'],
    },
};