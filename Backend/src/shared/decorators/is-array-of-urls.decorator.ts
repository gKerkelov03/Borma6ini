import { BadRequestException } from '@nestjs/common';
import { registerDecorator } from 'class-validator';

const isValidUrlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
    'i'
);

type IsArrayOfUrlsOptions = {
    minAllowedLength?: number;
    maxAllowedLength?: number;
};

export function IsArrayOfUrls(
    options: IsArrayOfUrlsOptions = {}
): (object: any, propertyName: string) => void {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'IsArrayOfUrls',
            target: object.constructor,
            propertyName: propertyName,
            validator: getValidator(options, propertyName)
        });
    };
}

function getValidator(
    { minAllowedLength = 0, maxAllowedLength = Infinity }: IsArrayOfUrlsOptions,
    propertyName: string
): {
    validate(urls: string[]): boolean;
} {
    return {
        validate(urls: string[]) {
            let errorMessage: string | null = null;

            if (!Array.isArray(urls)) {
                errorMessage = `${propertyName} should be an array`;
            } else if (!urls.every((url) => isValidUrlRegex.test(url))) {
                errorMessage = `${propertyName} should be an array of urls`;
            } else if (urls.length < minAllowedLength) {
                errorMessage = `${propertyName} should be an array of length greater than or equal to ${minAllowedLength}`;
            } else if (urls.length > maxAllowedLength) {
                errorMessage = `${propertyName} should be an array of length less than or equal to ${maxAllowedLength}`;
            }

            if (errorMessage) {
                throw new BadRequestException(errorMessage);
            }

            return true;
        }
    };
}
