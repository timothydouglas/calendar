import cli from './cli'
import { AvailableEvent } from '../models';

export async function createAvailable(event: Partial<AvailableEvent>): Promise<AvailableEvent> {
  return cli({
    method: 'post',
    url: '/AvailableDate',
    data: event
  });
}
