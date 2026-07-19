import { Popover } from "@/app/(main)/components/popover";
import { Calendar } from "@/app/components/calendar";
import * as dateFieldStyles from "@/app/components/date-field.css";
import CalendarIcon from "@/app/icons/icon-calendar.svg";
import * as fieldStyles from "@/app/styles/field.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { formatDate } from "@/app/utils/locale";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import clsx from "clsx";
import { ComponentProps, useId, useState } from "react";
import { useLabel } from "react-aria";
import { DialogTrigger } from "react-aria-components";
import { Button, DateValue } from "react-aria-components/DatePicker";

type DateFieldProps = {
  label: string;
  name: string;
  defaultValue?: CalendarDate;
};

export const DateField = ({ label, name, defaultValue }: DateFieldProps) => {
  const valueId = useId();
  const { labelProps, fieldProps } = useLabel({
    label,
    "aria-labelledby": valueId,
  });
  const [value, setValue] = useState<DateValue | null>(() => {
    return defaultValue === undefined ? null : defaultValue;
  });
  const [isOpen, setIsOpen] = useState(false);

  const valueProps: ComponentProps<"span"> = {
    id: valueId,
    ...(value === null
      ? {
          children: "Select a date",
          "data-placeholder": true,
        }
      : {
          children: formatDate(value.toDate(getLocalTimeZone())),
        }),
  };

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className={fieldStyles.field}>
        <label {...labelProps}>{label}</label>
        <Button
          className={clsx(dateFieldStyles.button, fieldStyles.input)}
          {...fieldProps}
        >
          <CalendarIcon className={fieldStyles.icon} />
          <span className={dateFieldStyles.value} {...valueProps} />
        </Button>
      </div>
      <input
        type="hidden"
        name={name}
        value={value === null ? "" : value.toString()}
      />
      <Popover
        className={sprinkles({ stack: "space-0200" })}
        placement="bottom start"
      >
        <Calendar
          minValue={today(getLocalTimeZone())}
          value={value}
          onChange={(value) => {
            setValue(value);
            setIsOpen(false);
          }}
        />
        <Button
          className={dateFieldStyles.clear}
          onPress={() => {
            setValue(null);
            setIsOpen(false);
          }}
        >
          Clear
        </Button>
      </Popover>
    </DialogTrigger>
  );
};
