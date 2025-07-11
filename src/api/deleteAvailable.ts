import cli from './cli'
import { AvailableEvent } from '../models';

export async function deleteAvailable(id: string): Promise<AvailableEvent> {
  return cli({
    method: 'delete',
    url: `/AvailableDate/${id}`,
  });
}
