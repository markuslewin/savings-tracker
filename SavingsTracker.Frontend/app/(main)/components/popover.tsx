import { popover } from "@/app/(main)/components/popover.css";
import clsx from "clsx";
import { Popover as AriaPopover, PopoverProps } from "react-aria-components";

export const Popover = ({ className, ...props }: PopoverProps) => {
  return (
    <AriaPopover
      className={clsx(popover, className)}
      placement="bottom end"
      offset={8}
      {...props}
    />
  );
};
