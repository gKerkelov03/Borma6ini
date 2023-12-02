import { BadRequestException } from '@nestjs/common';
import { registerDecorator } from 'class-validator';

export function IsNumberInRange(
    minAllowedNumber: number,
    maxAllowedNumber: number,
    allowOnlyIntegers = true
): (object: any, propertyName: string) => void {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsNumberInRange',
            target: object.constructor,
            propertyName: propertyName,
            validator: getValidator(
                minAllowedNumber,
                maxAllowedNumber,
                allowOnlyIntegers,
                propertyName
            )
        });
    };
}

function getValidator(
    minAllowedNumber: number,
    maxAllowedNumber: number,
    allowOnlyIntegers: boolean,
    propertyName: string
): {
    validate(number: number): boolean;
} {
    return {
        validate(number: number) {
            const isTheNumberFloatingPoint =
                parseInt(number.toString()) !== number;
            //TODO: refactor
            if (typeof number !== 'number') {
                throw new BadRequestException(
                    `${propertyName} should be a number `
                );
            }

            if (allowOnlyIntegers && isTheNumberFloatingPoint) {
                throw new BadRequestException(
                    `${propertyName} should be an integer value`
                );
            }

            if (number < minAllowedNumber || number > maxAllowedNumber) {
                throw new BadRequestException(
                    `${propertyName} should be between ${minAllowedNumber} and ${maxAllowedNumber}!`
                );
            }

            return true;
        }
    };
}
