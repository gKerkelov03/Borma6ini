import { IsDateString } from 'class-validator';

export class HasStartAndEndDate {
    @IsDateString()
    public startDate: Date;

    @IsDateString()
    public endDate: Date;
}
