import { IsMongoId } from 'class-validator';

export class HasUser {
    @IsMongoId()
    userId: string;
}
