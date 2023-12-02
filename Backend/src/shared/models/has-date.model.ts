import { IsDateString } from 'class-validator';

export class HasDate {
    @IsDateString()
    public date: Date;
}
