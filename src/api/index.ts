import * as createAvailable from './createAvailable';
import * as createUnavailable from './createUnavailable';
import * as deleteAvailable from './deleteAvailable';
import * as deleteUnavailable from './deleteUnavailable';
import * as fetchEvents from './fetchEvents';
import * as fetchLocations from './fetchLocations';
import * as fetchWorkUnits from './fetchWorkUnits';
import * as fetchUser from './fetchUser';
import * as logOut from './logOut';
import * as updateAvailable from './updateAvailable';
import * as updateUnavailable from './updateUnavailable';


export const apiMethods = {
  ...createAvailable,
  ...createUnavailable,
  ...deleteAvailable,
  ...deleteUnavailable,
  ...fetchEvents,
  ...fetchLocations,
  ...fetchWorkUnits,
  ...fetchUser,
  ...logOut,
  ...updateAvailable,
  ...updateUnavailable
};
