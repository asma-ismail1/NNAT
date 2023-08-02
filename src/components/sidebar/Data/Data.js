// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    route: "/",
  },
  {
    icon: UilPackage,
    heading: "Live Packet Sniffing",
    route: "/sniffer",
  },
  {
    icon: UilChart,
    heading: "PCAP Analyzer",
    route: "/analyzer",
  },
  {
    icon: UilClipboardAlt,
    heading: 'Live Scanner',
    route: "/scan",
  },
  
];
