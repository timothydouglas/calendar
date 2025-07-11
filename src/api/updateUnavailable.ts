import cli from './cli'
import { UnavailableEvent } from '../models';

export async function updateUnavailable(id: string, event: Partial<UnavailableEvent>): Promise<UnavailableEvent> {
  return cli({
    method: 'put',
    url: `/Calendar/${id}`,
    data: event
  });
}
