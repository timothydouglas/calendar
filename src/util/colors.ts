import { Colors, Event } from '../models';

/**
 * Generate HSL colors based on string
 * @param args
 */

export function toColorCode(...args: string[]): Colors {
  const str: string = args.join(':');

  let hash: number = 0;
  for (let i: number = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const hue: number = hash % 360;
  // 41 & 23 are prime numbers, so the sat & lum vary from each other
  const sat: number = 20 + (hash % 41);
  const lum: number = 65 + (hash % 23);
  // consistent gap between luminosity makes sure that the text is always readable
  const lumDark: number = lum - 30;

  return {
    dark: `hsl(${hue},${sat}%,${lumDark}%)`,
    light: `hsl(${hue},${sat}%,${lum}%)`
  };
}

/**
 * Set theme colors from event locationId, sectionId and workUnitId
 * @param event
 */
export const setEventTheme = <T extends Event>(event: T): T => ({
  ...event,
  ...((!!event.workUnitId || !!event.locationId || !!event.sectionId)
    ? { theme: toColorCode(event.workUnitId, event.locationId, event.sectionId) }
    : {}
  )
});
