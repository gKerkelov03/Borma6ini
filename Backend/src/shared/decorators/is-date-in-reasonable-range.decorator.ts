import { BadRequestException } from '@nestjs/common';
import { registerDecorator } from 'class-validator';

type IsDateInReasonableRangeOptions = {
    minAllowedDate?: Date;
    maxAllowedDate?: Date;
};

export function IsDateInReasonableRange(
    options: IsDateInReasonableRangeOptions = {}
): (object: any, propertyName: string) => void {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsDateInReasonableRange',
            target: object.constructor,
            propertyName: propertyName,
            validator: getValidator(options, propertyName)
        });
    };
}

function getValidator(
    {
        minAllowedDate = new Date('1950-01-01'),
        maxAllowedDate
    }: IsDateInReasonableRangeOptions,
    propertyName: string
): {
    validate(dateToValidateAsString: string): boolean;
} {
    return {
        validate(dateToValidateAsString: string) {
            const dateToValidate = new Date(dateToValidateAsString);
            let errorMessage: string | null = null;
            maxAllowedDate = new Date();

            if (
                !dateToValidateAsString ||
                typeof dateToValidateAsString !== 'string' ||
                isNaN(dateToValidate as any)
            ) {
                errorMessage = `${propertyName} should be a proper date`;
            } else if (
                dateToValidate < minAllowedDate ||
                dateToValidate > maxAllowedDate
            ) {
                errorMessage = `${propertyName} should be between ${minAllowedDate} and ${maxAllowedDate}`;
            }

            if (errorMessage) {
                throw new BadRequestException(errorMessage);
            }

            return true;
        }
    };
}
