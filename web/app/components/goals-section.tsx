"use client";

import {
  clickableContainer,
  clickableContainerItem,
  complete,
  dot,
  goalCard,
  goalCardDeadline,
  goalCardPercent,
  goalCards,
  goalsContainer,
  goalsHeading,
  inProgress,
  inProgressClose,
  noGoalsBorder,
  noGoalsContainer,
  noGoalsHeading,
  noProgress,
  progressFill,
  progressTrack,
  tag,
} from "@/app/(main)/page.css";
import * as buttonStyles from "@/app/components/button.css";
import { DashedRect } from "@/app/components/dashed";
import {
  popover,
  radioDot,
  radioGroupLabel,
} from "@/app/components/goals-section.css";
import FilterIcon from "@/app/icons/icon-filter.svg";
import PlusIcon from "@/app/icons/icon-plus.svg";
import SortIcon from "@/app/icons/icon-sort.svg";
import TargetIcon from "@/app/icons/icon-target.svg";
import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import {
  textPreset1,
  textPreset4,
  textPreset5,
  textPreset6,
  textPreset7,
} from "@/app/styles/text.css";
import { Filter, filters, filterSchema } from "@/app/utils/filter";
import { formatDate, formatPercent, formatUsd } from "@/app/utils/locale";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import {
  Button,
  DialogTrigger,
  Label,
  Link,
  Popover,
  Radio,
  RadioGroup,
} from "react-aria-components";

type GoalsSectionProps = {
  filter: Filter;
  goals: {
    id: string;
    name: string;
    target: number;
    deposits: { amount: number }[];
    deadline: Date | null;
  }[];
};

export const GoalsSection = ({ filter, goals }: GoalsSectionProps) => {
  const [optimisticFilter, setOptimisticFilter] = useOptimistic(filter);
  const [isPending, transition] = useTransition();
  const router = useRouter();

  return (
    <section className={goalsContainer}>
      <header
        className={sprinkles({
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "space-0200",
        })}
      >
        <h2 className={goalsHeading}>
          Your goals {isPending ? "(pending)" : null}
        </h2>
        <div
          className={sprinkles({
            display: "flex",
            flexWrap: "wrap",
            gap: "space-0200",
          })}
        >
          <DialogTrigger>
            <Button className={buttonStyles.variants.secondary}>
              <FilterIcon className={buttonStyles.icon} /> Filters
            </Button>
            <Popover
              className={clsx(
                card.styles.grey,
                popover,
                sprinkles({
                  width: "full",
                  maxWidth: "popover",
                }),
              )}
              placement="bottom end"
              offset={8}
            >
              <RadioGroup
                className={sprinkles({
                  display: "grid",
                })}
                value={optimisticFilter}
                onChange={(value) => {
                  const filter = filterSchema.parse(value);
                  transition(() => {
                    setOptimisticFilter(filter);
                    // `router` because `redirect` can't opt out of scroll
                    router.replace(
                      `/?${new URLSearchParams({
                        filter,
                      })}`,
                      {
                        scroll: false,
                      },
                    );
                  });
                }}
              >
                <Label
                  className={clsx(
                    radioGroupLabel,
                    textPreset6,
                    sprinkles({
                      textTransform: "uppercase",
                      color: "neutral-300",
                    }),
                  )}
                >
                  Filter by status
                </Label>
                <div
                  className={sprinkles({
                    display: "grid",
                    gap: "space-0025",
                  })}
                >
                  {filters.map((filter) => {
                    return (
                      <Radio
                        key={filter}
                        className={clsx(
                          sprinkles({
                            padding: "space-0100",
                            display: "grid",
                            gridTemplateColumns: "auto 1fr",
                            alignItems: "center",
                            gap: "space-0100",
                          }),
                          textPreset5,
                        )}
                        value={filter}
                      >
                        {({ isSelected, isFocusVisible }) => {
                          return (
                            <>
                              <div
                                className={clsx(
                                  sprinkles({
                                    border: "solid",
                                    borderColor: "neutral-500",
                                    borderRadius: "radius-full",
                                    width: "size-0200",
                                    height: "size-0200",
                                    display: "grid",
                                    placeItems: "center",
                                  }),

                                  isFocusVisible
                                    ? sprinkles({
                                        outline: "default",
                                        outlineOffset: "default",
                                      })
                                    : null,
                                )}
                              >
                                {isSelected ? (
                                  <div className={radioDot} />
                                ) : null}
                              </div>
                              <span
                                className={sprinkles({
                                  color: isSelected
                                    ? "neutral-0"
                                    : "neutral-300",
                                })}
                              >
                                {filter}
                              </span>
                            </>
                          );
                        }}
                      </Radio>
                    );
                  })}
                </div>
              </RadioGroup>
            </Popover>
          </DialogTrigger>
          <DialogTrigger>
            <Button className={buttonStyles.variants.secondary}>
              <SortIcon className={buttonStyles.icon} /> Sort by
            </Button>
            <Popover className={card.styles.grey}>List of options</Popover>
          </DialogTrigger>
        </div>
      </header>
      <div className={sprinkles({ marginBlockStart: "space-0300" })}>
        {goals.length <= 0 ? (
          <div className={noGoalsContainer}>
            <DashedRect className={noGoalsBorder} />
            <div
              className={sprinkles({
                marginInline: "auto",
                maxWidth: "paragraph",
                display: "grid",
                textAlign: "center",
              })}
            >
              <TargetIcon
                className={sprinkles({
                  marginInline: "auto",
                  width: "auto",
                  height: "size-0500",
                  color: "neutral-400",
                })}
              />
              <h3 className={noGoalsHeading}>No goals yet</h3>
              <p
                className={sprinkles({
                  marginBlockStart: "space-0250",
                  color: "neutral-300",
                })}
              >
                Start saving for something that matters. Create your first goal
                and track your progress.
              </p>
              <Button
                className={clsx(
                  buttonStyles.variants.primary,
                  sprinkles({
                    marginInline: "auto",
                    marginBlockStart: "space-0400",
                  }),
                )}
              >
                <PlusIcon className={buttonStyles.icon} />
                Create your first goal
              </Button>
            </div>
          </div>
        ) : (
          <ul className={goalCards} role="list">
            {goals.map((goal) => {
              const sum = goal.deposits.reduce((sum, deposit) => {
                return sum + deposit.amount;
              }, 0);
              const progress = sum / goal.target;

              return (
                <li
                  key={goal.id}
                  className={clsx(
                    goalCard,
                    progress <= 0
                      ? noProgress
                      : progress < 0.76
                        ? inProgress
                        : progress < 1
                          ? inProgressClose
                          : complete,
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
                    <h3 className={textPreset4}>
                      <Link
                        className={clsx(
                          clickableContainerItem,
                          sprinkles({
                            textDecoration: "none",
                            color: "inherit",
                          }),
                        )}
                        href={`/goal/${goal.id}`}
                      >
                        {goal.name}
                      </Link>
                    </h3>
                    {progress >= 1 ? (
                      <p
                        className={clsx(
                          sprinkles({
                            border: "solid",
                            borderColor: "green-500",
                            borderRadius: "radius-full",
                            textTransform: "uppercase",
                            background: "green-900",
                            color: "green-500",
                          }),
                          tag,
                          textPreset7,
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
                  <p
                    className={clsx(
                      goalCardPercent,
                      sprinkles({
                        marginBlockStart: "space-0400",
                      }),
                      textPreset1,
                    )}
                  >
                    {formatPercent(progress)}
                  </p>
                  <div
                    className={clsx(
                      progressTrack,
                      sprinkles({
                        marginBlockStart: "space-0200",
                        border: {
                          forcedColors: "solid",
                        },
                        borderRadius: "radius-full",
                        height: "size-0150",
                        display: "grid",
                        overflow: "hidden",
                      }),
                    )}
                  >
                    {progress <= 0 ? null : (
                      <div
                        className={clsx(
                          progressFill,
                          sprinkles({
                            border: "solid",
                            borderColor: "white-alpha-30",
                            borderRadius: "radius-full",
                            display: "grid",
                          }),
                        )}
                        style={{
                          width: `${progress * 100}%`,
                        }}
                      />
                    )}
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
                      {formatUsd(sum)} of {formatUsd(goal.target)}
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
