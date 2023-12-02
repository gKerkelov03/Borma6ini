import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { EmailsModule } from './emails/emails.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env'
        }),
        MongooseModule.forRoot(
            process.env.CONNECTION_STRING || 'mongodb://localhost/shapeshifter'
        ),
        ProductsModule,
        EmailsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
