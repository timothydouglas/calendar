/* eslint-disable  @typescript-eslint/no-explicit-any */
export interface ReferenceData {
  id: string;
  effectiveFrom?: string;
  version?: number;
  revisionId?: string;
  deleted?: boolean;
  createdDate?: string;
  createdBy?: string;
  future?: boolean;
  active?: boolean;
  past?: boolean;
  rollsUpTo?: any;
  hrmsLocationId?: string;
  garageCode?: string;
  bureau?: string;
  manpowerLocationId?: string;
  districtCode?: number;
  boroId?: any;
  servicedBy?: any;
  legacyZone?: string;
  servicesSelf?: boolean;
  mainGarage?: boolean;
  badRecord?: boolean;
  correlationId: {
    correlation: string;
  };
  code: string;
  description: string;
  shortDescription?: string;
  value?: {
    correlation: string;
  };
}
