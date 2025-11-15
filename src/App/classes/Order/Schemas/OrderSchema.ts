import { OrderItemSchema } from "../../OrderItem/Schemas/OrderItemSchema";

export const OrderSchema = {
    schema: {
        type: 'object',
        properties: {
            userId: { type: 'number', example: 1 },
            priceTotal: { type: 'number', example: 120.0 },
            items: {
                type: 'array',
                minItems: 1, // pelo menos 1 item
                items: OrderItemSchema.schema, // reutilizando schema do item
            },
        },
        required: ['userId', 'priceTotal', 'items'],
    },
};