import cli from './cli'
import { UnavailableEvent } from '../models';

export async function deleteUnavailable(id: string): Promise<UnavailableEvent> {
  return cli({
    method: 'delete',
    url: `/Calendar/${id}`,
  });
}
