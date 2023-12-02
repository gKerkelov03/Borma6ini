import { Module } from '@nestjs/common';
import { EmailsService } from './services/emails.service';

@Module({
    imports: [],
    providers: [EmailsService]
})
export class EmailsModule {}
