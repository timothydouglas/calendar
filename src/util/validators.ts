import { Context, define, Struct } from 'superstruct';
import { isAfter, isBefore, isValid } from './dates';
import {
  VALIDATOR_DATE_AFTER,
  VALIDATOR_DATE_BEFORE,
  VALIDATOR_REQUIRED,
  VALIDATOR_VALID_DATE
} from '../constants';

export const requiredValidator: Struct<string, null> = define(
  'required',
  (value: unknown) => (value as string)?.length
    ? true
    : VALIDATOR_REQUIRED
);

export const validDateValidator: Struct<string | Date, null> = define(
  'validDate',
  (value: unknown) => isValid(new Date(value as string ?? undefined))
    ? true
    : VALIDATOR_VALID_DATE
);

/**
 * Validates the current control date is before the specified control date.
 * @param before
 */
export const isBeforeValidator = (before: string): Struct<string | Date, null> => define(
  'isBefore',
  (value: unknown, { branch }: Context) => {
    const date: Date = new Date(value as string ?? undefined);
    const beforeDate: Date = new Date(branch[branch.length - 2]?.[before]);
    if (!isValid(date)) {
      return VALIDATOR_VALID_DATE;
    } else if (isValid(beforeDate) && isAfter(date, beforeDate)) {
      return VALIDATOR_DATE_BEFORE;
    } else {
      return true;
    }
  }
);

/**
 * Validates the current control date is after the specified control date.
 * @param after
 */
export const isAfterValidator = (after: string): Struct<string | Date, null> => define(
  'isAfter',
  (value: unknown, { branch }: Context) => {
    const date: Date = new Date(value as string ?? undefined);
    const afterDate: Date = new Date(branch[branch.length - 2]?.[after]);
    if (!isValid(date)) {
      return VALIDATOR_VALID_DATE;
    } else if (isValid(afterDate) && isBefore(date, afterDate)) {
      return VALIDATOR_DATE_AFTER;
    } else {
      return true;
    }
  }
);

