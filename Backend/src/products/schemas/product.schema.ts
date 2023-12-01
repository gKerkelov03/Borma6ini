import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductSchemaTemplate {}

export type ProductDocument = ProductSchemaTemplate & Document;

export const ProductSchema = SchemaFactory.createForClass(
    ProductSchemaTemplate
);
