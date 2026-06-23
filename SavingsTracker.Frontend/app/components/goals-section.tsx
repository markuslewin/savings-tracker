"use client";

import { DialogButton } from "@/app/(main)/components/dialog-button";
import { Popover } from "@/app/(main)/components/popover";
import {
  clickableContainer,
  clickableContainerItem,
  dot,
  goalCard,
  goalCardDeadline,
  goalCardPercent,
  goalCards,
  goalsContainer,
} from "@/app/(main)/page.css";
import { Button } from "@/app/components/button";
import { DashedRect } from "@/app/components/dashed";
import {
  noGoalsBody,
  noGoalsBorder,
  noGoalsContainer,
  noGoalsContent,
  noGoalsHeading,
  noGoalsIcon,
  radio,
  radioCircle,
  radioDot,
  radioGroup,
  radioGroupLabel,
  radioLabel,
  radios,
} from "@/app/components/goals-section.css";
import { Progress } from "@/app/components/progress";
import FilterIcon from "@/app/icons/icon-filter.svg";
import PlusIcon from "@/app/icons/icon-plus.svg";
import SortIcon from "@/app/icons/icon-sort.svg";
import TargetIcon from "@/app/icons/icon-target.svg";
import { box } from "@/app/styles/box.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { IconProp } from "@/app/utils/_icon";
import { User } from "@/app/utils/api";
import {
  Filter,
  filters,
  filterSchema,
  getFilterLabel,
} from "@/app/utils/filter";
import { formatCents, formatDate, formatPercent } from "@/app/utils/locale";
import { getSortLabel, Sort, sorts, sortSchema } from "@/app/utils/sort";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useOptimistic, useTransition } from "react";
import {
  DialogTrigger,
  Label,
  Link,
  RadioButton,
  RadioField,
  RadioGroup,
  SelectionIndicator,
} from "react-aria-components";

type GoalsSectionProps = {
  filter: Filter;
  sort: Sort;
  view:
    | { type: "no-goals"; user: User | null }
    | {
        type: "goals";
        goals: {
          id: number;
          name: string;
          target: number;
          saved: number;
          deadline: Date | null;
        }[];
      };
};

export const GoalsSection = ({ filter, sort, view }: GoalsSectionProps) => {
  const [optimisticFilter, setOptimisticFilter] = useOptimistic(filter);
  const [optimisticSort, setOptimisticSort] = useOptimistic(sort);
  const [isPending, transition] = useTransition();
  const router = useRouter();

  const setSearchParams = useCallback(
    ({ filter, sort }: { filter: Filter; sort: Sort }) => {
      // `router` because `redirect` can't opt out of scroll
      router.replace(
        `/?${new URLSearchParams({
          filter,
          sort,
        })}`,
        {
          scroll: false,
        },
      );
    },
    [router],
  );

  return (
    <section className={goalsContainer} id="goals">
      <header
        className={sprinkles({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "space-0200",
        })}
      >
        <h2
          className={sprinkles({
            text: "2",
          })}
        >
          Your goals
        </h2>
        <div
          className={sprinkles({
            display: "flex",
            flexWrap: "wrap",
            gap: "space-0200",
          })}
        >
          <GoalsOptions
            icon={FilterIcon}
            label="Filters"
            optionsLabel="Filter by status"
            options={filters}
            getOptionLabel={getFilterLabel}
            value={optimisticFilter}
            onChange={(value) => {
              const filter = filterSchema.parse(value);
              transition(() => {
                setOptimisticFilter(filter);
                setSearchParams({ sort: optimisticSort, filter });
              });
            }}
          />
          <GoalsOptions
            icon={SortIcon}
            label="Sort by"
            optionsLabel="Sort by"
            options={sorts}
            getOptionLabel={getSortLabel}
            value={optimisticSort}
            onChange={(value) => {
              const sort = sortSchema.parse(value);
              transition(() => {
                setOptimisticSort(sort);
                setSearchParams({ filter: optimisticFilter, sort });
              });
            }}
          />
        </div>
      </header>
      <div
        className={sprinkles({ marginBlockStart: "space-0300" })}
        data-testid="goals"
      >
        {view.type === "no-goals" ? (
          <div className={noGoalsContainer}>
            <DashedRect className={noGoalsBorder} />
            <div className={noGoalsContent}>
              <TargetIcon className={noGoalsIcon} />
              <h3 className={noGoalsHeading}>No goals yet</h3>
              <p className={noGoalsBody}>
                Start saving for something that matters. Create your first goal
                and track your progress.
              </p>
              <DialogButton
                className={sprinkles({
                  marginInline: "auto",
                  marginBlockStart: "space-0400",
                })}
                dialogId="new-goal"
                user={view.user}
                icon={PlusIcon}
              >
                Create your first goal
              </DialogButton>
            </div>
          </div>
        ) : view.goals.length <= 0 ? (
          <div className={noGoalsContainer}>
            <DashedRect className={noGoalsBorder} />
            <div className={noGoalsContent}>
              <TargetIcon className={noGoalsIcon} />
              <h3 className={noGoalsHeading}>No goals found</h3>
              <p className={noGoalsBody}>
                No goals matched the filter. Try selecting another filter above.
              </p>
            </div>
          </div>
        ) : (
          <ul
            className={goalCards}
            role="list"
            data-pending={isPending ? "true" : undefined}
            aria-label="Your goals"
          >
            {view.goals.map((goal) => {
              const progress = goal.saved / goal.target;

              return (
                <li
                  key={goal.id}
                  className={clsx(
                    goalCard[
                      progress <= 0
                        ? "noProgress"
                        : progress < 0.76
                          ? "inProgress"
                          : progress < 1
                            ? "inProgressClose"
                            : "complete"
                    ],
                    clickableContainer,
                  )}
                >
                  <div
                    className={sprinkles({
                      marginBlockEnd: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "space-0200",
                    })}
                  >
                    <h3
                      className={sprinkles({
                        text: "4",
                      })}
                    >
                      <Link
                        className={clsx(
                          clickableContainerItem,
                          sprinkles({
                            textDecoration: "none",
                            color: "inherit",
                          }),
                        )}
                        href={`/goals/${goal.id}`}
                      >
                        {goal.name}
                      </Link>
                    </h3>
                    {progress >= 1 ? (
                      <p
                        className={clsx(
                          box,
                          sprinkles({
                            borderRadius: "radius-full",
                            boxSpaceBlock: "space-0050",
                            boxSpaceInline: "space-0125",
                            text: "7",
                            textTransform: "uppercase",
                            background: "green-900",
                            color: "green-500",
                          }),
                        )}
                      >
                        <span
                          className={sprinkles({
                            display: "inline-block",
                            translate: "down",
                          })}
                        >
                          Complete
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <div
                    className={sprinkles({
                      marginBlockStart: "space-0400",
                      stack: "space-0200",
                    })}
                  >
                    <p
                      className={clsx(
                        goalCardPercent,
                        sprinkles({ text: "1" }),
                      )}
                    >
                      {formatPercent(progress)}
                    </p>
                    <Progress value={progress} />
                  </div>
                  <div
                    className={sprinkles({
                      marginBlockStart: {
                        mobile: "space-0200",
                        tablet: "space-0300",
                      },
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "space-0100",
                    })}
                  >
                    <p>
                      {formatCents(goal.saved)} of {formatCents(goal.target)}
                    </p>
                    <div className={dot} />
                    <p className={goalCardDeadline}>
                      {goal.deadline === null
                        ? "No deadline"
                        : `Due ${formatDate(goal.deadline)}`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

type GoalsOptionsProps<Value extends string> = {
  icon: IconProp;
  label: string;
  optionsLabel: string;
  options: Readonly<Value[]>;
  getOptionLabel: (value: Value) => string;
  value: Value;
  onChange: (value: string) => void;
};

const GoalsOptions = <Value extends string>({
  icon,
  label,
  optionsLabel,
  options,
  getOptionLabel,
  value,
  onChange,
}: GoalsOptionsProps<Value>) => {
  return (
    <DialogTrigger>
      <Button variant="secondary" icon={icon}>
        {label}
      </Button>
      <Popover>
        <RadioGroup className={radioGroup} value={value} onChange={onChange}>
          <Label className={radioGroupLabel}>{optionsLabel}</Label>
          <div className={radios}>
            {options.map((option) => {
              return (
                <RadioField key={option} value={option}>
                  <RadioButton className={radio}>
                    <div className={radioCircle}>
                      <SelectionIndicator className={radioDot} />
                    </div>
                    <span className={radioLabel}>{getOptionLabel(option)}</span>
                  </RadioButton>
                </RadioField>
              );
            })}
          </div>
        </RadioGroup>
      </Popover>
    </DialogTrigger>
  );
};
