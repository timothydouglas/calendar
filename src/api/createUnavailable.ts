import cli from './cli'
import { UnavailableEvent } from '../models';

export async function createUnavailable(event: Partial<UnavailableEvent>): Promise<UnavailableEvent> {
  return cli({
    method: 'post',
    url: '/Calendar',
    data: event
  });
}
