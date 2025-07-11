export interface User {
  username: string;
  payrollLocation: string;
  workforceId: string;
  authorizedLocations: string[];
  authoritiesAsStrings: string[]
  jwtTokenId: string;
}
