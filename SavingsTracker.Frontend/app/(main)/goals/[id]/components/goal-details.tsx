"use client";

import { FinishedStat } from "@/app/(main)/goals/[id]/components/finished-stat";
import { depositLayout } from "@/app/(main)/goals/[id]/components/goal-details.css";
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
import { formatDate, formatPercent, formatUsd } from "@/app/utils/locale";
import { nbsp } from "@/app/utils/unicode";
import clsx from "clsx";

type GoalProps = {
  goal: Goal;
  addDepositAction: (formData: FormData) => Promise<void>;
};

export const GoalDetails = ({ goal, addDepositAction }: GoalProps) => {
  const progress = 1;
  const remaining = 123;
  const saved = 321;

  // todo: Fix
  const inTimeResult =
    goal.deadline === null
      ? ({ type: "no-deadline" } as const)
      : ({ type: "deadline", deadline: goal.deadline } as const);

  return (
    <div className={split}>
      {progress >= 1 ? (
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
              sprinkles({
                borderRadius: "radius-full",
                borderColor: "transparent",
                width: "size-0800",
                height: "size-0800",
                // todo: Fix
                boxSpaceBlock: "space-0",
                boxSpaceInline: "space-0",
                display: "grid",
                placeItems: "center",
                background: "white-alpha-30",
                color: "neutral-0",
              }),
            )}
          >
            <CheckmarkIcon
              className={sprinkles({
                width: "size-0400",
                height: "size-0400",
              })}
            />
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
              <p>
                You saved {formatUsd(350)} across {goal.deposits.length}{" "}
                deposits.
                {inTimeResult.type === "deadline"
                  ? ` Finished before your ${formatDate(inTimeResult.deadline)} deadline.`
                  : null}
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
            <FinishedStat term="Deposits" data={goal.deposits.length} />
            <div
              className={sprinkles({
                borderInlineStart: "solid",
                borderColor: "white-alpha-30",
                alignSelf: "stretch",
              })}
            />
            <FinishedStat term="Total saved" data={formatUsd(350)} />
          </dl>
        </div>
      ) : (
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
              >
                {formatPercent(progress)}
              </strong>
              <p
                className={sprinkles({
                  text: "4",
                  color: "neutral-300",
                })}
              >
                {formatUsd(remaining)} remaining
              </p>
            </div>
            <div
              className={sprinkles({
                stack: "space-0200",
              })}
            >
              <Progress className={progressColor.orange} value={0.5} />
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
                >
                  <span>{formatUsd(saved)}</span>
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
                >
                  <span>of {formatUsd(goal.target)}</span>
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
            <form
              className={sprinkles({
                stack: "space-0300",
              })}
              action={addDepositAction}
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
                  isRequired
                />
                <TextField
                  label="Note (optional)"
                  name="note"
                  placeholder="e.g. Monthly savings"
                />
              </div>
              <Button type="submit" variant="primary">
                Add funds
              </Button>
            </form>
          </div>
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
            {goal.deposits.length} deposits
          </p>
        </div>
        <ul
          className={sprinkles({
            stack: "space-0",
            text: "6",
          })}
          role="list"
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
                  <h3>{deposit.note.length <= 0 ? nbsp : deposit.note}</h3>
                  <p>
                    <span className={srOnly}>Created at: </span>
                    {formatDate(deposit.createdAt)}
                  </p>
                </div>
                <p
                  className={sprinkles({
                    text: "5-semiBold",
                    color: "green-500",
                  })}
                >
                  <span className={srOnly}>Amount: </span>+
                  {formatUsd(deposit.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
