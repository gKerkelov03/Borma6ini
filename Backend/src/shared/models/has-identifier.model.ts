import { IsMongoId } from 'class-validator';

export class HasIdentifier {
    @IsMongoId()
    public id: string;
}
