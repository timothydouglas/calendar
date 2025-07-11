import { PropsWithChildren } from 'react';

export function Sidebar({ children }: PropsWithChildren): JSX.Element  {
  return (
    <aside className="border-t p-5 w-64" data-testid="sidebar">
      {children}
    </aside>
  );
}
