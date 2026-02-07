import { IconName } from "@lib/enums/IconName";
import Envelope from "./Envelope.svg?raw";
import MapPin from "./MapPin.svg?raw";
import Phone from "./Phone.svg?raw";
import Plus from "./Plus.svg?raw";
import Chevron from "./Chevron.svg?raw";
import Cart from "./Cart.svg?raw";

const iconMap: Record<IconName, string> = {
  [IconName.PHONE]: Phone,
  [IconName.PLUS]: Plus,
  [IconName.ENVELOPE]: Envelope,
  [IconName.MAP_PIN]: MapPin,
  [IconName.CHEVRON]: Chevron,
  [IconName.CART]: Cart,
};

export { iconMap };
