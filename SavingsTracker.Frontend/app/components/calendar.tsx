import * as styles from "@/app/components/calendar.css";
import ChevronLeftIcon from "@/app/icons/icon-chevron-left.svg";
import clsx from "clsx";
import {
  Calendar as AriaCalendar,
  CalendarCell as AriaCalendarCell,
  CalendarGrid as AriaCalendarGrid,
  Button,
  CalendarHeading,
  type CalendarProps as AriaCalendarProps,
  type CalendarCellProps,
  type CalendarGridProps,
  type DateValue,
} from "react-aria-components/Calendar";

type CalendarProps<T extends DateValue> = AriaCalendarProps<T>;

export function Calendar<T extends DateValue>(props: CalendarProps<T>) {
  const months = props.visibleDuration?.months || 1;
  return (
    <AriaCalendar {...props}>
      {Array.from({ length: months }, (_, i) => (
        <div key={i} className={styles.month}>
          <header className={styles.header}>
            <Button className={styles.control} slot="previous">
              <ChevronLeftIcon className={styles.controlIcon} />
            </Button>
            <CalendarHeading offset={{ months: i }} />
            <Button className={styles.control} slot="next">
              <ChevronLeftIcon
                className={clsx(styles.controlIcon, styles.rotate)}
              />
            </Button>
          </header>
          <CalendarGrid offset={{ months: i }}>
            {(date) => <CalendarCell date={date} />}
          </CalendarGrid>
        </div>
      ))}
    </AriaCalendar>
  );
}

export function CalendarCell(props: CalendarCellProps) {
  return <AriaCalendarCell {...props} className={styles.gridCell} />;
}

export function CalendarGrid(props: CalendarGridProps) {
  return <AriaCalendarGrid className={styles.grid} {...props} />;
}
