import React from 'react';
import { CreateUnavailability } from '../components';

export function Sidebar() {
  return(
      <aside className="border p-5 w-64" data-testid="sidebar">
        <CreateUnavailability />
      </aside>
  )
}
