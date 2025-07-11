import { Struct } from 'superstruct';
import { ObjectType } from 'superstruct/dist/utils';

export type AvailableEventValidator = Struct<
  ObjectType<{
    label: Struct<string, null>;
    excludedDate: Struct<string | Date, null>;
  }>
>;
