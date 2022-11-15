export interface Unavailability {
  title: string;
  startDate: string;
  endDate: string;
  department: {
    departmentId: number;
    departmentName: string;
  },
  recurrenceStrategy: number;
  month: number;
  day: number;
  daysOfWeek: number;
  label: string;
}
