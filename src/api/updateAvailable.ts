import cli from './cli';
import { AvailableEvent } from '../models';

export async function updateAvailable(id: string, event: Partial<AvailableEvent>): Promise<AvailableEvent> {
  return cli({
    method: 'put',
    url: `/AvailableDate/${id}`,
    data: event
  });
}
