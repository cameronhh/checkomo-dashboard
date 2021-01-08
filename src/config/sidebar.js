import { Download, Group, Scan, UserExpert } from 'grommet-icons';

export const sidebar = [
  {
    label: 'Recents',
    Icon: Group,
    path: '/',
  },
  {
    label: 'Check-In',
    Icon: UserExpert,
    path: '/checkins',
  },
  {
    label: 'QR Codes',
    Icon: Scan,
    path: '/qr',
  },
  {
    label: 'Export',
    Icon: Download,
    path: '/export',
  },
];
