"use client";

import { FinishedStat } from "@/app/(main)/goals/[id]/components/finished-stat";
import {
  depositLayout,
  glassCircle,
  glassCircleInner,
} from "@/app/(main)/goals/[id]/components/goal-details.css";
import { split } from "@/app/(main)/goals/[id]/page.css";
import { Button } from "@/app/components/button";
import { Progress } from "@/app/components/progress";
import { progressColor } from "@/app/components/progress.css";
import { TextField } from "@/app/components/text-field";
import ArrowDownIcon from "@/app/icons/icon-arrow-down.svg";
import CheckmarkIcon from "@/app/icons/icon-checkmark.svg";
import DollarIcon from "@/app/icons/icon-dollar.svg";
import { box } from "@/app/styles/box.css";
import { card } from "@/app/styles/card.css";
import { sprinkles } from "@/app/styles/sprinkles.css";
import { srOnly } from "@/app/styles/srOnly.css";
import { Goal } from "@/app/utils/api";
import { newCalendarDate } from "@/app/utils/date";
import { FormAction } from "@/app/utils/form";
import { getProgress, getRemaining, getSaved } from "@/app/utils/goal";
import { isCompletedInDueTime } from "@/app/utils/goal.client";
import { formatDate, formatDollars, formatPercent } from "@/app/utils/locale";
import { nbsp } from "@/app/utils/unicode";
import { getLocalTimeZone } from "@internationalized/date";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useActionState } from "react";
import { Form } from "react-aria-components";

type GoalProps = {
  goal: Goal;
  addDepositAction: FormAction<"amount" | "note">;
};

export const GoalDetails = ({ goal, addDepositAction }: GoalProps) => {
  const [state, dispatch, isPending] = useActionState(addDepositAction, {
    values: { amount: "", note: "" },
  });

  const saved = getSaved(goal);
  const progress = getProgress({ ...goal, saved });
  const remaining = getRemaining({ ...goal, saved });

  return (
    <div className={split}>
      {progress < 1 ? (
        <div
          className={sprinkles({
            stack: "space-0300",
          })}
        >
          <div
            className={clsx(
              card.grey,
              sprinkles({
                boxSpace: {
                  mobile: "space-0200",
                  tablet: "space-0300",
                },
                stack: "space-0300",
              }),
            )}
          >
            <h2 className={srOnly}>Progress</h2>
            <div
              className={sprinkles({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              })}
            >
              <strong
                className={sprinkles({
                  text: "1",
                })}
                data-testid="progress"
              >
                {formatPercent(progress)}
              </strong>
              <p
                className={sprinkles({
                  text: "4",
                  color: "neutral-300",
                })}
                data-testid="remaining"
              >
                {formatDollars(remaining)} remaining
              </p>
            </div>
            <div
              className={sprinkles({
                stack: "space-0200",
              })}
            >
              <Progress className={progressColor.orange} value={progress} />
              <div
                className={sprinkles({
                  display: "flex",
                  justifyContent: "space-between",
                  text: "6",
                })}
              >
                <p
                  className={sprinkles({
                    stack: "space-0050",
                  })}
                  data-testid="saved"
                >
                  <span>{formatDollars(saved)}</span>
                  <span
                    className={sprinkles({
                      color: "neutral-300",
                    })}
                  >
                    Saved so far
                  </span>
                </p>
                <p
                  className={sprinkles({
                    stack: "space-0050",
                    textAlign: "end",
                  })}
                  data-testid="target"
                >
                  <span>of {formatDollars(goal.target)}</span>
                  <span
                    className={sprinkles({
                      color: "neutral-300",
                    })}
                  >
                    Target
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              card.grey,
              sprinkles({
                stack: "space-0300",
                boxSpace: {
                  mobile: "space-0200",
                  tablet: "space-0300",
                },
              }),
            )}
          >
            <h2 className={sprinkles({ text: "4" })}>Add deposit</h2>
            <Form
              className={sprinkles({
                stack: "space-0300",
              })}
              action={dispatch}
              validationErrors={state.errors}
            >
              <div
                className={sprinkles({
                  stack: "space-0250",
                })}
              >
                <TextField
                  label="Amount"
                  icon={DollarIcon}
                  name="amount"
                  placeholder="0.00"
                  defaultValue={state.values.amount}
                  isRequired
                />
                <TextField
                  label="Note (optional)"
                  name="note"
                  placeholder="e.g. Monthly savings"
                  defaultValue={state.values.note}
                />
              </div>
              <Button type="submit" variant="primary" isPending={isPending}>
                Add funds
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <div
          className={clsx(
            card.orange,
            sprinkles({
              stack: "space-0500",
              boxSpaceBlock: "space-0600",
              boxSpaceInline: "space-0300",
            }),
          )}
        >
          <div
            className={clsx(
              box,
              glassCircle,
              sprinkles({
                borderRadius: "radius-full",
                borderColor: "transparent",
                width: "size-0800",
                height: "size-0800",
                // todo: Fix
                boxSpaceBlock: "space-0",
                boxSpaceInline: "space-0",
                display: "grid",
              }),
            )}
          >
            <div className={glassCircleInner}>
              <CheckmarkIcon
                className={sprinkles({
                  width: "size-0400",
                  height: "size-0400",
                })}
              />
            </div>
          </div>
          <div
            className={sprinkles({
              stack: "space-0300",
            })}
          >
            <h2 className={srOnly}>Progress</h2>
            <strong
              className={sprinkles({
                text: "1",
              })}
            >
              100%
            </strong>
            <div
              className={sprinkles({
                stack: "space-0125",
              })}
            >
              <h3
                className={sprinkles({
                  text: "2",
                })}
              >
                Goal Complete
              </h3>
              <p data-testid="complete-body">
                You saved{" "}
                <span data-testid="saved">{formatDollars(saved)}</span> across{" "}
                <span data-testid="deposits-count">{goal.deposits.length}</span>{" "}
                deposits. <InDueTimeMessage goal={goal} />
              </p>
            </div>
          </div>
          <dl
            className={sprinkles({
              cluster: {
                mobile: "space-0250",
                tablet: "space-0400",
              },
            })}
          >
            <FinishedStat
              term="Deposits"
              data={goal.deposits.length}
              testId="deposits-count"
            />
            <div
              className={sprinkles({
                borderInlineStart: "solid",
                borderColor: "white-alpha-30",
                alignSelf: "stretch",
              })}
            />
            <FinishedStat
              term="Total saved"
              data={formatDollars(saved)}
              testId="saved"
            />
          </dl>
        </div>
      )}
      <div
        className={sprinkles({
          stack: "space-0200",
        })}
      >
        <div
          className={sprinkles({
            cluster: "space-0200",
            justifyContent: "space-between",
          })}
        >
          <h2 className={sprinkles({ text: "4" })}>Deposit history</h2>
          <p
            className={sprinkles({
              text: "6",
              color: "neutral-300",
            })}
          >
            <span data-testid="deposits-count">{goal.deposits.length}</span>{" "}
            deposits
          </p>
        </div>
        <ul
          className={sprinkles({
            stack: "space-0",
            text: "6",
          })}
          role="list"
          aria-label="Deposits"
        >
          {goal.deposits.map((deposit) => {
            return (
              <li
                className={clsx(
                  depositLayout,
                  sprinkles({
                    borderBlockStart: "solid",
                    borderColor: "neutral-800",
                    paddingBlock: "space-0200",
                  }),
                )}
                key={deposit.id}
              >
                <div
                  className={sprinkles({
                    width: "size-0500",
                    height: "size-0500",
                    border: "solid",
                    borderRadius: "radius-full",
                    display: "grid",
                    placeItems: "center",
                    background: "neutral-800",
                    color: "neutral-0",
                  })}
                >
                  <ArrowDownIcon
                    className={sprinkles({
                      width: "auto",
                      height: "size-0250",
                    })}
                  />
                </div>
                <div
                  className={sprinkles({
                    stack: "space-0025",
                  })}
                >
                  <h3 data-testid="note">
                    {deposit.note.length <= 0 ? nbsp : deposit.note}
                  </h3>
                  <p
                    className={sprinkles({
                      color: "neutral-300",
                    })}
                  >
                    <span className={srOnly}>Created at: </span>
                    {formatDate(deposit.createdAt)}
                  </p>
                </div>
                <p
                  className={sprinkles({
                    text: "5-semiBold",
                    color: "green-500",
                  })}
                  data-testid="amount"
                >
                  <span className={srOnly}>Amount: </span>+
                  {formatDollars(deposit.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const InDueTimeMessage = dynamic(
  async () =>
    ({ goal }: { goal: Goal }) => {
      if (goal.deadline === null) return null;

      const deadline = newCalendarDate(goal.deadline);
      return isCompletedInDueTime({ ...goal, deadline })
        ? `Finished before your ${formatDate(deadline.toDate(getLocalTimeZone()))} deadline.`
        : null;
    },
  { loading: () => null, ssr: false },
);
