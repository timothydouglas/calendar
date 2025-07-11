import { Struct } from 'superstruct';
import { ObjectType } from 'superstruct/dist/utils';

export type UnavailableEventValidator = Struct<
  ObjectType<{
    label: Struct<string, null>;
    startDate: Struct<string | Date, null>;
    endDate: Struct<string | Date, null>;
    recurrenceStrategy: Struct<string, null>;
  }>
>;
