export const routes = [
  {
    path: '/login',
    component: 'Login',
    guest: true,
    enabled: true,
  },
  {
    path: '/signup',
    component: 'SignUp',
    guest: true,
    enabled: true,
  },
  {
    path: '/',
    component: 'Dashboard',
    private: true,
    enabled: true,
  },
  {
    path: '/checkins',
    component: 'CheckIns',
    private: true,
    enabled: true,
  },
  {
    path: '/qr',
    component: 'QRCodes',
    private: true,
    enabled: true,
  },
  {
    path: '/export',
    component: 'Export',
    private: true,
    enabled: true,
  },
  {
    path: '/qr/generate/:venueId/:venueCode',
    component: 'QRPDF',
    private: true,
    enabled: true,
  },
  {
    path: '404',
    component: 'NotFound',
    enabled: true,
  },
]
