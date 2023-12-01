import { Length } from 'class-validator';

export const IsNameWithReasonableLength = () => Length(2, 25);
