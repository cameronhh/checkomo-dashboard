import {
  Download,
  Group,
  Map,
  Scan,
} from "grommet-icons";

export const sidebar = [
  {
    label: "Recents",
    Icon: Map,
    path: "/"
  },
  {
    label: "Check-In",
    Icon: Group,
    path: "/checkins"
  },
  {
    label: "QR Codes",
    Icon: Scan,
    path: "/qr"
  },
  {
    label: "Export",
    Icon: Download,
    path: "/export"
  },
];
