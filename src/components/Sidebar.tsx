import React from 'react';
import { CreateUnavailability } from '../components';
import { MiniCalendar } from './MiniCalendar';

export function Sidebar() {
  return(
      <aside className="border p-5 w-64" data-testid="sidebar">
        <CreateUnavailability />
        <MiniCalendar />
      </aside>
  )
}
