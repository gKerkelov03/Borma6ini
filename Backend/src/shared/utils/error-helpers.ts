import { BadRequestException } from '@nestjs/common';

export function wrapInHttpExceptionAndRethrow(err: Error): never {
    throw new BadRequestException(err.message);
}

const cache = new Map();
export function throwErrorIfNull(
    errorMessage: string
): (document: Record<string, any> | null) => any {
    if (!cache.has(errorMessage)) {
        cache.set(errorMessage, (document: Record<string, any> | null) => {
            if (!document) {
                throw new Error(errorMessage);
            }

            return document;
        });
    }

    return cache.get(errorMessage);
}
