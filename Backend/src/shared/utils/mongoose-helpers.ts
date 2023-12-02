import { Prop } from '@nestjs/mongoose';

export const Required = (options = {}) => Prop({ required: true, ...options });

export const RequiredWithType = (type: any, options = {}) =>
    Prop({ type, required: true, ...options });
