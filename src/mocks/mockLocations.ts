import { SelectOption } from '../models';

export const mockLocations: SelectOption[] = [
  {
    id: 'location1',
    label: 'Location 1',
    data: {
      workUnitId: 'workUnit1',
      sections: [
        {
          id: 'section1',
          label: 'Section 1'
        },
        {
          id: 'section2',
          label: 'Section 2'
        },
        {
          id: 'section3',
          label: 'Section 3'
        }
      ]
    }
  },
  {
    id: 'location2',
    label: 'Location 2',
    data: {
      workUnitId: 'workUnit2',
      sections: [
        {
          id: 'section4',
          label: 'Section 4'
        },
        {
          id: 'section5',
          label: 'Section 5'
        },
        {
          id: 'section6',
          label: 'Section 6'
        }
      ]
    }
  },
  {
    id: 'location3',
    label: 'Location 3',
    data: {
      workUnitId: 'workUnit3'
    }
  }
];
