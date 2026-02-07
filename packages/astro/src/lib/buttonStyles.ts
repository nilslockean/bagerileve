import { cn } from "./cn";
import type { ButtonVariant } from "./types/ButtonVariant";

export function buttonStyles(
  variant: ButtonVariant,
  size: "default" | "small" = "default"
) {
  return cn(
    "inline-block uppercase font-futura tracking-wider border-4 transition-colors py-4 px-6 mt-4 mr-4",
    "bg-blue-950 border-blue-950 hover:bg-blue-900 active:border-blue-900 text-orange-50 cursor-pointer",
    {
      "border-orange-100 bg-orange-100 hover:bg-orange-50 active:border-orange-50 text-blue-900":
        variant === "primary",
    },
    {
      "border-current bg-transparent hover:bg-blue-950 active:border-blue-950":
        variant === "outline",
    },
    {
      "border-orange-50 text-orange-50 bg-transparent hover:bg-blue-950 active:border-blue-950":
        variant === "outline-light",
    },
    {
      "text-sm py-2 px-4 mt-3 mr-3": size === "small",
    }
  );
}
