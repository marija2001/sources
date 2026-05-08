import { FaMicrochip, FaNetworkWired } from "react-icons/fa";
import { MdOutlineDeveloperBoard } from "react-icons/md";
import { HiOutlineRocketLaunch } from "react-icons/hi2";

const ICONS = {
  FaMicrochip,
  MdOutlineDeveloperBoard,
  FaNetworkWired,
  HiOutlineRocketLaunch,
};

export function getServiceIcon(key) {
  if (key && ICONS[key]) return ICONS[key];
  return FaMicrochip;
}
