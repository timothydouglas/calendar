import { SelectOption } from './SelectOption.interface';

export type UseStrategiesHook = {
  handleStrategy: (recurrenceStrategy: string) => void;
  resetStrategy: (startDate?: string | Date) => void;
  strategies: SelectOption[];
}
