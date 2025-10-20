import { cn } from "./cn";
import type { ButtonVariant } from "./types/ButtonVariant";

export function buttonStyles(
  variant: ButtonVariant,
  size: "default" | "small" = "default"
) {
  return cn(
    "inline-block uppercase font-futura tracking-wider border-4 transition-colors py-4 px-6 mt-4 mr-4",
    "bg-orange-100 border-orange-100 hover:bg-orange-50 active:border-orange-50 dark:bg-blue-950 dark:border-blue-950 dark:hover:bg-blue-900 dark:active:border-blue-900 text-blue-900 dark:text-orange-50 ",
    {
      "border-blue-900 dark:border-orange-100 bg-blue-900 dark:bg-orange-100 hover:bg-blue-800 dark:hover:bg-orange-50  active:border-blue-800 dark:active:border-orange-50  text-orange-50 dark:text-blue-900":
        variant === "primary",
    },
    {
      "border-current bg-transparent dark:bg-transparent dark:border-current hover:bg-blue-100 dark:hover:bg-blue-950 active:border-blue-100 dark:active:border-blue-950":
        variant === "outline",
    },
    {
      "border-orange-50 dark:border-orange-50 text-orange-50 dark:text-orange-50 bg-transparent dark:bg-transparent hover:bg-blue-950 dark:hover:bg-blue-950 active:border-blue-950 dark:active:border-blue-950":
        variant === "outline-light",
    },
    {
      "text-sm py-2 px-4 mt-3 mr-3": size === "small",
    }
  );
}
