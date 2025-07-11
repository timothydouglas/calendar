import { ReactNode } from 'react';
import { PolicyGroup } from 'react-guardian';

export type ModalProps = {
  open?: boolean;
  guards?: Record<string, PolicyGroup>;
  onClose: () => void;
  title: string;
  clear: () => void;
  children: ReactNode;
}
